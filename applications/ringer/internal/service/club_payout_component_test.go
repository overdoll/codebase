package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/money"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubPayoutModified struct {
	Id          relay.ID
	Reference   string
	Status      types.ClubPayoutStatus
	Currency    types.Currency
	Amount      int
	Events      []types.ClubPayoutEvent
	DepositDate time.Time
}

type ClubPayouts struct {
	Entities []struct {
		Club struct {
			ID      string
			Payouts *struct {
				Edges []struct {
					Node ClubPayoutModified
				}
			} `graphql:"payouts()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func getPayoutsForClub(t *testing.T, client *graphql.Client, clubId string) ClubPayouts {
	// refresh index to ensure we get the most up-to-date value
	refreshPayoutsIndex(t)

	var pays ClubPayouts

	err := client.Query(context.Background(), &pays, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         string(convertClubIdToRelayId(clubId)),
			},
		},
	})

	require.NoError(t, err)

	return pays
}

type ClubPayout struct {
	ClubPayout *ClubPayoutModified `graphql:"payout(reference: $reference)"`
}

func getClubPayout(t *testing.T, client *graphql.Client, paymentId string) ClubPayout {

	var pay ClubPayout

	err := client.Query(context.Background(), &pay, map[string]interface{}{
		"reference": graphql.String(paymentId),
	})

	require.NoError(t, err)

	return pay
}

type PayoutPayments struct {
	Entities []struct {
		Payout struct {
			ID       string
			Payments *struct {
				Edges []struct {
					Node ClubPaymentModified
				}
			} `graphql:"payments()"`
		} `graphql:"... on Payout"`
	} `graphql:"_entities(representations: $representations)"`
}

func getPaymentsForPayout(t *testing.T, client *graphql.Client, payoutId string) PayoutPayments {
	// refresh index to ensure we get the most up-to-date value
	refreshPaymentsIndex(t)

	var pays PayoutPayments

	err := client.Query(context.Background(), &pays, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Payout",
				"id":         string(convertPayoutIdToRelayId(payoutId)),
			},
		},
	})

	require.NoError(t, err)

	return pays
}

type DepositRequestModified struct {
	Id                 relay.ID
	Reference          string
	Currency           money.Currency
	BaseAmount         int
	EstimatedFeeAmount int
	PayoutMethod       types.PayoutMethod
	TotalAmount        int
	Payouts            *struct {
		Edges []struct {
			Node ClubPayoutModified
		}
	} `graphql:"payouts()"`
}

type DepositRequests struct {
	DepositRequests *struct {
		Edges []struct {
			Node DepositRequestModified
		}
	} `graphql:"depositRequests()"`
}

type DepositRequest struct {
	DepositRequest *DepositRequestModified `graphql:"depositRequest(reference: $reference)"`
}

type Payouts struct {
	Payouts *struct {
		Edges []struct {
			Node ClubPayoutModified
		}
	} `graphql:"payouts(status: $status)"`
}

type InitiateClubPayout struct {
	InitiateClubPayout *struct {
		Club struct {
			Id relay.ID
		}
	} `graphql:"initiateClubPayout(input: $input)"`
}

func TestClubPayout(t *testing.T) {
	t.Parallel()

	// truncate deposit requests table to ensure we can run the same test over and over again
	cleanupDepositRequests(t)

	seedAmount := 10
	clubId := uuid.New().String()
	accountId := clubId
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// seed a payout method for this account or else the payout won't work
	setupPayoutMethodForAccount(t, accountId)

	for i := 0; i < seedAmount; i++ {
		seedPayment(t, uuid.New().String(), clubId, accountId)
	}

	balances := getClubBalances(t, gClient, clubId)

	require.Equal(t, 7000, balances.Entities[0].Club.Balance.Amount, "correct club balance")

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.GenerateClubMonthlyPayout, mock.Anything)

	var initiate InitiateClubPayout

	err := gClient.Mutate(context.Background(), &initiate, map[string]interface{}{
		"input": types.InitiateClubPayoutInput{
			ClubID: convertClubIdToRelayId(clubId),
		},
	})

	require.NoError(t, err, "no error initiating a manual payout")

	// run a workflow to create a payout for this club
	env := getWorkflowEnvironment(t)

	payoutId := ""

	// callback to wait until the real deposit will happen
	env.RegisterDelayedCallback(func() {
		// get payments for the club
		payments := getPayoutsForClub(t, gClient, clubId)

		require.Len(t, payments.Entities, 1)
		require.Len(t, payments.Entities[0].Club.Payouts.Edges, 1, "has at least 1 payout")
		targetPayout := payments.Entities[0].Club.Payouts.Edges[0].Node

		// check payment is in correct state
		require.Equal(t, types.ClubPayoutStatusQueued, targetPayout.Status, "payout is queued")
		require.Equal(t, 7000, targetPayout.Amount, "correct base amount")
		require.Equal(t, types.CurrencyUsd, targetPayout.Currency, "correct currency")

		payoutId = targetPayout.Reference

		pays := getPaymentsForPayout(t, gClient, payoutId)

		require.Len(t, pays.Entities[0].Payout.Payments.Edges, 10, "should have found 10 payments linked to this payout")

		for _, p := range pays.Entities[0].Payout.Payments.Edges {
			require.Equal(t, types.ClubPaymentStatusReady, p.Node.Status, "payments should be in the ready stage")
		}

	}, time.Hour*24*30)

	// generate the payout
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "payout successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "payout seeded without errors")

	// query the state after the payment has been settled
	payout := getClubPayout(t, gClient, payoutId)

	// payout was fully processed && deposited
	require.NotNil(t, payout.ClubPayout, "payout was found")
	require.Equal(t, types.ClubPayoutStatusDeposited, payout.ClubPayout.Status, "payout was deposited")

	// check the updated balance
	balances = getClubBalances(t, gClient, clubId)
	require.Equal(t, 0, balances.Entities[0].Club.Balance.Amount, "balance should be 0 after the payout")

	refreshPayoutsIndex(t)

	// check deposit requests
	var deposits DepositRequests

	err = gClient.Query(context.Background(), &deposits, nil)

	require.NoError(t, err)

	require.Len(t, deposits.DepositRequests.Edges, 1, "should have found 1 deposit request")

	depositRequest := deposits.DepositRequests.Edges[0].Node

	depositRequestId := depositRequest.Reference

	validateDepositRequest(t, depositRequest)

	var depositR DepositRequest

	err = gClient.Query(context.Background(), &depositR, map[string]interface{}{
		"reference": graphql.String(depositRequestId),
	})

	require.NoError(t, err)

	require.NotNil(t, depositR.DepositRequest, "should have found the deposit request")

	validateDepositRequest(t, depositRequest)

	// check that all the payments linked to the payouts are now "completed"
	pays := getPaymentsForPayout(t, gClient, payoutId)
	require.Len(t, pays.Entities[0].Payout.Payments.Edges, 10, "should have found 10 payments linked to this payout")

	for _, p := range pays.Entities[0].Payout.Payments.Edges {
		require.Equal(t, types.ClubPaymentStatusComplete, p.Node.Status, "payment should now be in the complete stage")
	}

	var allPayouts Payouts

	err = gClient.Query(context.Background(), &allPayouts, map[string]interface{}{
		"status": []types.ClubPayoutStatus{types.ClubPayoutStatusDeposited},
	})

	require.NoError(t, err)

	require.GreaterOrEqual(t, len(allPayouts.Payouts.Edges), 1, "should have found in global payouts query")
}

func validateDepositRequest(t *testing.T, depositRequest DepositRequestModified) {
	require.Equal(t, types.PayoutMethodPaxum, depositRequest.PayoutMethod, "correct payout method as paxum")
	require.Equal(t, types.CurrencyUsd, depositRequest.Currency, "correct currency")
	require.Equal(t, 7000, depositRequest.BaseAmount, "correct base amount for deposit request")
	require.Equal(t, 51, depositRequest.EstimatedFeeAmount, "correct estimated fee amount for deposit request")
	require.Equal(t, 7051, depositRequest.TotalAmount, "correct total amount")
	require.Len(t, depositRequest.Payouts.Edges, 1, "should have 1 payout")
}

type RetryClubPayout struct {
	RetryClubPayout *struct {
		Id relay.ID
	} `graphql:"retryClubPayout(input: $input)"`
}

// TestClubPayout_simulate_error - run a test to create a payout but simulate an error from the payout provider
func TestClubPayout_simulate_error(t *testing.T) {
	t.Parallel()

	seedAmount := 10
	clubId := uuid.New().String() + "_failure"
	accountId := clubId
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// seed a payout method for this account or else the payout won't work
	setupPayoutMethodForAccount(t, accountId)

	for i := 0; i < seedAmount; i++ {
		seedPayment(t, uuid.New().String(), clubId, accountId)
	}

	// run a workflow to create a payout for this club
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)

	// generate the payout
	env.ExecuteWorkflow(workflows.GenerateClubMonthlyPayout, workflows.GenerateClubMonthlyPayoutInput{
		ClubId:     clubId,
		FutureTime: nil,
		WorkflowId: "TestWorkflowID_123",
	})

	require.True(t, env.IsWorkflowCompleted(), "payout successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "payout seeded without errors")

	// get payments for the club
	payments := getPayoutsForClub(t, gClient, clubId)

	require.Len(t, payments.Entities, 1)
	require.Len(t, payments.Entities[0].Club.Payouts.Edges, 1, "has at least 1 payout")
	targetPayout := payments.Entities[0].Club.Payouts.Edges[0].Node

	require.Equal(t, types.ClubPayoutStatusFailed, targetPayout.Status, "payout failed")
	require.Len(t, targetPayout.Events, 3, "should have 3 events since we retry 3 times")

	var retry RetryClubPayout

	// retry our payout. it should now succeed because of the way we set up our mocks
	err := gClient.Mutate(context.Background(), &retry, map[string]interface{}{
		"input": types.RetryClubPayoutInput{
			PayoutID: targetPayout.Id,
		},
	})

	require.NoError(t, err, "no error retrying a payout")

	payments = getPayoutsForClub(t, gClient, clubId)

	require.Len(t, payments.Entities, 1)
	require.Len(t, payments.Entities[0].Club.Payouts.Edges, 1, "has at least 1 payout")
	targetPayout = payments.Entities[0].Club.Payouts.Edges[0].Node

	require.Equal(t, types.ClubPayoutStatusDeposited, targetPayout.Status, "payout changed to deposited")
	require.Len(t, targetPayout.Events, 3, "should have 3 events since we retry 3 times")
}

type CancelClubPayout struct {
	CancelClubPayout *struct {
		Id relay.ID
	} `graphql:"cancelClubPayout(input: $input)"`
}

func TestClubPayout_cancel(t *testing.T) {
	t.Parallel()

	seedAmount := 10
	clubId := uuid.New().String() + "_failure"
	accountId := clubId
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// seed a payout method for this account or else the payout won't work
	setupPayoutMethodForAccount(t, accountId)

	for i := 0; i < seedAmount; i++ {
		seedPayment(t, uuid.New().String(), clubId, accountId)
	}

	// run a workflow to create a payout for this club
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)

	env.RegisterDelayedCallback(func() {
		payments := getPayoutsForClub(t, gClient, clubId)

		workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.CancelClubPayout, mock.Anything)

		var cancel CancelClubPayout

		// cancel our payout.
		err := gClient.Mutate(context.Background(), &cancel, map[string]interface{}{
			"input": types.CancelClubPayoutInput{PayoutID: payments.Entities[0].Club.Payouts.Edges[0].Node.Id},
		})

		require.NoError(t, err, "no error retrying a payout")

		newEnd := getWorkflowEnvironment(t)

		newEnd.OnRequestCancelExternalWorkflow(mock.Anything, mock.Anything, mock.Anything).
			Run(
				func(args mock.Arguments) {
					// cancel our workflow because it won't actually be cancelled by temporal
					env.CancelWorkflow()
				},
			).
			Return(nil).
			Once()

		// run the actual cancel workflow - this should prevent the monthly payout workflow from continuing
		workflowExecution.FindAndExecuteWorkflow(t, newEnd)
		require.True(t, env.IsWorkflowCompleted(), "cancel workflow succeeded")
		require.NoError(t, env.GetWorkflowError(), "cancel workflow succeeded without errors")

	}, time.Hour*24*30)

	// generate the payout
	env.ExecuteWorkflow(workflows.GenerateClubMonthlyPayout, workflows.GenerateClubMonthlyPayoutInput{
		ClubId:     clubId,
		FutureTime: nil,
		WorkflowId: "TestWorkflowID_123",
	})

	require.True(t, env.IsWorkflowCompleted(), "payout successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "payout seeded without errors")

	// check actual status of payouts
	payments := getPayoutsForClub(t, gClient, clubId)
	require.Len(t, payments.Entities[0].Club.Payouts.Edges, 1, "should have 1 payout")
	targetPayout := payments.Entities[0].Club.Payouts.Edges[0].Node
	require.Equal(t, types.ClubPayoutStatusCancelled, targetPayout.Status, "payout changed to cancelled")
}

type UpdateClubPayoutDepositDate struct {
	UpdateClubPayoutDepositDate *struct {
		Id relay.ID
	} `graphql:"updateClubPayoutDepositDate(input: $input)"`
}

func TestClubPayout_update_deposit_date(t *testing.T) {

	seedAmount := 10
	accountId := uuid.New().String()
	clubId := uuid.New().String() + "_failure"
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// seed a payout method for this account or else the payout won't work
	setupPayoutMethodForAccount(t, accountId)

	for i := 0; i < seedAmount; i++ {
		seedPayment(t, uuid.New().String(), clubId, accountId)
	}

	// run a workflow to create a payout for this club
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)

	newTime := time.Now().Add(time.Hour * 1)

	payoutId := ""

	env.RegisterDelayedCallback(func() {

		payments := getPayoutsForClub(t, gClient, clubId)

		payoutRelayId := payments.Entities[0].Club.Payouts.Edges[0].Node.Id
		payoutId = payments.Entities[0].Club.Payouts.Edges[0].Node.Reference

		temporalClientMock.On("SignalWorkflow", mock.Anything, mock.Anything, "", workflows.UpdatePayoutDateSignal, newTime).
			Run(
				func(args mock.Arguments) {
					env.SignalWorkflow(workflows.UpdatePayoutDateSignal, newTime)
				},
			).
			Return(nil).
			Once()

		var update UpdateClubPayoutDepositDate

		// update deposit date of payout
		err := gClient.Mutate(context.Background(), &update, map[string]interface{}{
			"input": types.UpdateClubPayoutDepositDateInput{
				PayoutID: payoutRelayId,
				NewDate:  newTime,
			},
		})

		require.NoError(t, err, "no error retrying a payout")
	}, time.Hour*24*30)

	// generate the payout
	env.ExecuteWorkflow(workflows.GenerateClubMonthlyPayout, workflows.GenerateClubMonthlyPayoutInput{
		ClubId:     clubId,
		FutureTime: nil,
		WorkflowId: "TestWorkflowID_123",
	})

	require.True(t, env.IsWorkflowCompleted(), "payout successfully seeded")
	require.NoError(t, env.GetWorkflowError(), "payout seeded without errors")

	// check payout has the updated deposit date
	payments := getPayoutsForClub(t, gClient, clubId)
	require.Len(t, payments.Entities[0].Club.Payouts.Edges, 1, "should have 1 payout")
	targetPayout := payments.Entities[0].Club.Payouts.Edges[0].Node
	require.Equal(t, newTime, targetPayout.DepositDate, "payout updated deposit date")
}
