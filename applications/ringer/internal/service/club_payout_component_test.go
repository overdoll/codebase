package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/money"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubPayoutModified struct {
	Id        relay.ID
	Reference string
	Status    types.ClubPayoutStatus
	Currency  types.Currency
	Amount    int
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

func TestClubPayout(t *testing.T) {
	t.Parallel()

	// truncate deposit requests table to ensure we can run the same test over and over again
	setupDepositRequests(t)

	seedAmount := 10
	clubId := uuid.New().String()
	accountId := clubId
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	for i := 0; i < seedAmount; i++ {
		seedPayment(t, uuid.New().String(), clubId, accountId)
	}

	balances := getClubBalances(t, gClient, clubId)

	require.Equal(t, balances.Entities[0].Club.Balance, 7000, "correct club balance")

	// run a workflow to create a payout for this club
	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.GenerateClubMonthlyPayout)

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

		refreshPaymentsIndex(t)

		var pays PayoutPayments

		err := gClient.Query(context.Background(), &pays, map[string]interface{}{
			"representations": []_Any{
				{
					"__typename": "Payout",
					"id":         string(convertPayoutIdToRelayId(payoutId)),
				},
			},
		})

		require.NoError(t, err)

		require.Len(t, pays.Entities[0].Payout.Payments.Edges, 10, "should have found 10 payments linked to this payout")

	}, time.Hour*24*30)

	// generate the payout
	env.ExecuteWorkflow(workflows.GenerateClubMonthlyPayout, workflows.GenerateClubMonthlyPayoutInput{
		ClubId:     clubId,
		FutureTime: nil,
		WorkflowId: "TestWorkflowID_123",
	})

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

	err := gClient.Query(context.Background(), &deposits, nil)

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
}

func validateDepositRequest(t *testing.T, depositRequest DepositRequestModified) {
	require.Equal(t, types.PayoutMethodPaxum, depositRequest.PayoutMethod, "correct payout method as paxum")
	require.Equal(t, types.CurrencyUsd, depositRequest.Currency, "correct currency")
	require.Equal(t, 7000, depositRequest.BaseAmount, "correct base amount for deposit request")
	require.Equal(t, 51, depositRequest.EstimatedFeeAmount, "correct estimated fee amount for deposit request")
	require.Equal(t, 7051, depositRequest.TotalAmount, "correct total amount")
	require.Len(t, depositRequest.Payouts.Edges, 1, "should have 1 payout")
}
