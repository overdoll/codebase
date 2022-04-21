package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	ringer "overdoll/applications/ringer/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubPaymentModified struct {
	Id                relay.ID
	Reference         string
	Source            types.ClubPaymentSource
	Status            types.ClubPaymentStatus
	Currency          types.Currency
	BaseAmount        int
	PlatformFeeAmount int
	FinalAmount       int
	IsDeduction       bool
}

type ClubPayments struct {
	Entities []struct {
		Club struct {
			ID       string
			Payments *struct {
				Edges []struct {
					Node ClubPaymentModified
				}
			} `graphql:"payments()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func getPaymentsForClub(t *testing.T, client *graphql.Client, clubId string) ClubPayments {
	// refresh index to ensure we get the most up-to-date value
	refreshPaymentsIndex(t)

	var pays ClubPayments

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

type ClubPayment struct {
	ClubPayment *ClubPaymentModified `graphql:"payment(reference: $reference)"`
}

func getClubPayment(t *testing.T, client *graphql.Client, paymentId string) ClubPayment {

	var pay ClubPayment

	err := client.Query(context.Background(), &pay, map[string]interface{}{
		"reference": graphql.String(paymentId),
	})

	require.NoError(t, err)

	return pay
}

type Payments struct {
	Payments *struct {
		Edges []struct {
			Node ClubPaymentModified
		}
	} `graphql:"payments(status: $status)"`
}

func TestClubPaymentDeposit(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ClubPaymentDeposit, mock.Anything)

	clubId := uuid.New().String()
	accountId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	_, err := client.ClubPaymentDeposit(context.Background(), &ringer.ClubPaymentDepositRequest{
		AccountTransactionId: uuid.New().String(),
		SourceAccountId:      accountId,
		DestinationClubId:    clubId,
		Payment: &ringer.Payment{
			Amount:   100,
			Currency: "USD",
		},
		Timestamp: timestamppb.New(time.Now()),
		Source:    ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION,
	})

	require.NoError(t, err)

	env := getWorkflowEnvironment(t)

	paymentId := ""

	// here, we query the state before the payment is settled
	env.RegisterDelayedCallback(func() {

		// get payments for the club
		payments := getPaymentsForClub(t, gClient, clubId)

		require.Len(t, payments.Entities, 1)
		require.Len(t, payments.Entities[0].Club.Payments.Edges, 1, "has at least 1 payment")
		targetPayment := payments.Entities[0].Club.Payments.Edges[0].Node

		// check payment is in correct state
		require.Equal(t, types.ClubPaymentSourceClubSupporterSubscription, targetPayment.Source, "source as club supporter subscription")
		require.Equal(t, types.ClubPaymentStatusPending, targetPayment.Status, "payment in pending state")
		require.Equal(t, 100, targetPayment.BaseAmount, "correct base amount")
		require.Equal(t, 30, targetPayment.PlatformFeeAmount, "correct platform fee amount")
		require.Equal(t, 70, targetPayment.FinalAmount, "correct final amount")
		require.Equal(t, false, targetPayment.IsDeduction, "not a deduction")
		require.Equal(t, types.CurrencyUsd, targetPayment.Currency, "correct currency")

		paymentId = targetPayment.Reference

		// check the balance
		balances := getClubBalances(t, gClient, clubId)
		require.Equal(t, 70, balances.Entities[0].Club.PendingBalance.Amount, "correct club pending balance")
		require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.PendingBalance.Currency, "correct club pending balance currency")
	}, time.Hour*24*30)

	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "club payment deposit complete")
	require.NoError(t, env.GetWorkflowError(), "club payment deposit no error")

	// query the state after the payment has been settled
	payment := getClubPayment(t, gClient, paymentId)

	require.NotNil(t, payment.ClubPayment, "payment was found")
	require.Equal(t, types.ClubPaymentStatusReady, payment.ClubPayment.Status, "payment updated to ready state")

	// check the balance
	balances := getClubBalances(t, gClient, clubId)

	// pending balance should have 0 now
	require.Equal(t, 0, balances.Entities[0].Club.PendingBalance.Amount, "correct club pending balance")
	require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.PendingBalance.Currency, "correct club pending balance currency")

	// transferred to the current balance
	require.Equal(t, 70, balances.Entities[0].Club.Balance.Amount, "correct club balance")
	require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.Balance.Currency, "correct club balance currency")

	var allPayments Payments

	err = gClient.Query(context.Background(), &allPayments, map[string]interface{}{
		"status": []types.ClubPaymentStatus{types.ClubPaymentStatusReady},
	})

	require.NoError(t, err)

	require.GreaterOrEqual(t, len(allPayments.Payments.Edges), 1, "should have found in global payments query")
}

func TestClubPaymentDeduction(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.ClubPaymentDeduction, mock.Anything)

	clubId := uuid.New().String()
	accountId := uuid.New().String()
	accountTransactionId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// we need to first seed a payment with the exact values as the one below because a deduction relies on an existing payment
	seedPayment(t, accountTransactionId, clubId, accountId)

	_, err := client.ClubPaymentDeduction(context.Background(), &ringer.ClubPaymentDeductionRequest{
		AccountTransactionId: accountTransactionId,
		SourceAccountId:      accountId,
		DestinationClubId:    clubId,
		Payment: &ringer.Payment{
			Amount:   50,
			Currency: "USD",
		},
		Timestamp: timestamppb.New(time.Now()),
		Source:    ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION,
	})

	require.NoError(t, err)

	env := getWorkflowEnvironment(t)

	paymentId := ""

	// here, we query the state before the payment is settled
	env.RegisterDelayedCallback(func() {
		// get payments for the club
		payments := getPaymentsForClub(t, gClient, clubId)

		require.Len(t, payments.Entities, 1)
		require.Len(t, payments.Entities[0].Club.Payments.Edges, 1, "has at least 1 payment")
		targetPayment := payments.Entities[0].Club.Payments.Edges[0].Node

		// check payment is in correct state
		require.Equal(t, types.ClubPaymentSourceClubSupporterSubscription, targetPayment.Source, "source as club supporter subscription")
		require.Equal(t, types.ClubPaymentStatusPending, targetPayment.Status, "payment in pending state")
		require.Equal(t, 50, targetPayment.BaseAmount, "correct base amount")
		require.Equal(t, 15, targetPayment.PlatformFeeAmount, "correct platform fee amount")
		require.Equal(t, 35, targetPayment.FinalAmount, "correct final amount")
		require.Equal(t, true, targetPayment.IsDeduction, "is a deduction")
		require.Equal(t, types.CurrencyUsd, targetPayment.Currency, "correct currency")

		paymentId = targetPayment.Reference

		// check the balance
		balances := getClubBalances(t, gClient, clubId)
		require.Equal(t, -35, balances.Entities[0].Club.PendingBalance.Amount, "correct club pending balance")
		require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.PendingBalance.Currency, "correct club pending balance currency")
	}, time.Hour*24*30)

	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted(), "club payment deposit complete")
	require.NoError(t, env.GetWorkflowError(), "club payment deposit no error")

	// query the state after the payment has been settled
	payment := getClubPayment(t, gClient, paymentId)

	require.NotNil(t, payment.ClubPayment, "payment was found")
	require.Equal(t, types.ClubPaymentStatusReady, payment.ClubPayment.Status, "payment updated to ready state")

	// check the balance
	balances := getClubBalances(t, gClient, clubId)

	// pending balance should have 0 now
	require.Equal(t, 0, balances.Entities[0].Club.PendingBalance.Amount, "correct club pending balance")
	require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.PendingBalance.Currency, "correct club pending balance currency")

	// transferred to the current balance
	require.Equal(t, -35, balances.Entities[0].Club.Balance.Amount, "correct club balance")
	require.Equal(t, types.CurrencyUsd, balances.Entities[0].Club.Balance.Currency, "correct club balance currency")
}
