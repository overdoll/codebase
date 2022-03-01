package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type BecomeClubSupporterWithAccountSavedPaymentMethod struct {
	BecomeClubSupporterWithAccountSavedPaymentMethod *types.BecomeClubSupporterWithAccountSavedPaymentMethodPayload `graphql:"becomeClubSupporterWithAccountSavedPaymentMethod(input: $input)"`
}

type DeleteAccountSavedPaymentMethod struct {
	DeleteAccountSavedPaymentMethod *types.DeleteAccountSavedPaymentMethodPayload `graphql:"deleteAccountSavedPaymentMethod(input: $input)"`
}

type ExtendAccountClubSupporterSubscription struct {
	ExtendAccountClubSupporterSubscription *struct {
		ClubSupporterSubscription *struct {
			NextBillingDate time.Time
		}
	} `graphql:"extendAccountClubSupporterSubscription(input: $input)"`
}

type VoidOrRefundAccountClubSupporterSubscription struct {
	VoidOrRefundAccountClubSupporterSubscription *types.VoidOrRefundAccountClubSupporterSubscriptionPayload `graphql:"voidOrRefundAccountClubSupporterSubscription(input: $input)"`
}

type GenerateRefundAmountForAccountClubSupporterSubscription struct {
	GenerateRefundAmountForAccountClubSupporterSubscription *types.GenerateRefundAmountForAccountClubSupporterSubscriptionPayload `graphql:"generateRefundAmountForAccountClubSupporterSubscription(input: $input)"`
}

type CancelAccountClubSupporterSubscription struct {
	CancelAccountClubSupporterSubscription *struct {
		ClubSupporterSubscription *struct {
			CancellationReason *types.CancellationReason
		}
	} `graphql:"cancelAccountClubSupporterSubscription(input: $input)"`
}

func TestAccountClubSupporterSubscriptionActions(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	// once again, do another new sale success webhook, since this sets up everything we need for the following test
	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

	// since we know internally how these IDs are created, we create the ID here without having to grab it through an API call
	savedPaymentMethodId := relay.NewID(types.AccountSavedPaymentMethod{}, accountId, ccbillSubscriptionId)
	accountClubSupporterSubscriptionId := relay.NewID(types.AccountClubSupporterSubscription{}, accountId, clubId, ccbillSubscriptionId)

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var becomeSupporter BecomeClubSupporterWithAccountSavedPaymentMethod

	err := gqlClient.Mutate(context.Background(), &becomeSupporter, map[string]interface{}{
		"input": types.BecomeClubSupporterWithAccountSavedPaymentMethodInput{
			ClubID:               relay.NewID(types.Club{}, clubId),
			Currency:             types.CurrencyUsd,
			SavedPaymentMethodID: savedPaymentMethodId,
		},
	})

	require.NoError(t, err, "no error becoming a supporter with a saved payment method")

	transactionDetails := getCCBillTransactionDetails(t, gqlClient, *becomeSupporter.BecomeClubSupporterWithAccountSavedPaymentMethod.CcbillTransactionToken)
	require.True(t, transactionDetails.CCBillTransactionDetails.Approved, "is approved transaction")

	// now, delete our saved payment method
	var deleteSavedPayment DeleteAccountSavedPaymentMethod

	err = gqlClient.Mutate(context.Background(), &becomeSupporter, map[string]interface{}{
		"input": types.DeleteAccountSavedPaymentMethodInput{
			SavedPaymentMethodID: savedPaymentMethodId,
		},
	})

	require.NoError(t, err, "no error deleting saved payment method")
	require.NotNil(t, deleteSavedPayment.DeleteAccountSavedPaymentMethod.DeletedAccountSavedPaymentMethodID, "should be sent back")

	// extend our subscription
	var extendClubSupporterSubscription ExtendAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &extendClubSupporterSubscription, map[string]interface{}{
		"input": types.ExtendAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
			Days:                        3,
		},
	})

	require.NoError(t, err, "no error extending club supporter subscription")
	require.Equal(t, "2022-04-02 00:00:00 +0000 UTC", extendClubSupporterSubscription.ExtendAccountClubSupporterSubscription.ClubSupporterSubscription.NextBillingDate, "should be extended")

	// extend our subscription
	var generateProratedRefund GenerateRefundAmountForAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &generateProratedRefund, map[string]interface{}{
		"input": types.GenerateRefundAmountForAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
		},
	})

	require.NoError(t, err, "no error generating prorated refund")
	require.Less(t, generateProratedRefund.GenerateRefundAmountForAccountClubSupporterSubscription.RefundAmount.ProratedAmount, 6.99, "correct amount")
	require.Equal(t, 6.99, generateProratedRefund.GenerateRefundAmountForAccountClubSupporterSubscription.RefundAmount.MaximumAmount, "correct max amount")
	require.Equal(t, types.CurrencyUsd, generateProratedRefund.GenerateRefundAmountForAccountClubSupporterSubscription.RefundAmount.Currency, "correct max amount")

	// void or refund subscription
	var voidOrRefund VoidOrRefundAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &voidOrRefund, map[string]interface{}{
		"input": types.VoidOrRefundAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
			Amount:                      generateProratedRefund.GenerateRefundAmountForAccountClubSupporterSubscription.RefundAmount.ProratedAmount,
		},
	})

	require.NoError(t, err, "no error refunding or voiding subscription")
	require.NotNil(t, voidOrRefund.VoidOrRefundAccountClubSupporterSubscription.DeletedClubSupporterSubscriptionID, "id exists")

	// cancel account club supporter subscription
	var cancel CancelAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &cancel, map[string]interface{}{
		"input": types.CancelAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
			CancellationReasonID:        relay.NewID(types.CancellationReason{}, "1q7MJ5IyRTV0X4J27F3m5wGD5mj"),
		},
	})

	require.NoError(t, err, "no error cancelling")
	require.NotNil(t, cancel.CancelAccountClubSupporterSubscription.ClubSupporterSubscription.CancellationReason, "cancellation reason is set")
}
