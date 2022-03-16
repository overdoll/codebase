package service_test

import (
	"context"
	"encoding/base64"
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
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
	clubId := uuid.New().String()

	// once again, do another new sale success webhook, since this sets up everything we need for the following test
	// club ID will be a different ID because that's what the subscription is for
	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, ccbillTransactionId, uuid.New().String(), nil)

	// since we know internally how these IDs are created, we create the ID here without having to grab it through an API call
	savedPaymentMethodId := relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.AccountSavedPaymentMethod{}, accountId, ccbillSubscriptionId))))
	accountClubSupporterSubscriptionId := relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.AccountActiveClubSupporterSubscription{}, accountId, clubId, ccbillSubscriptionId))))

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var becomeSupporter BecomeClubSupporterWithAccountSavedPaymentMethod

	err := gqlClient.Mutate(context.Background(), &becomeSupporter, map[string]interface{}{
		"input": types.BecomeClubSupporterWithAccountSavedPaymentMethodInput{
			ClubID:               convertClubIdIdToRelayId(clubId),
			Currency:             types.CurrencyUsd,
			SavedPaymentMethodID: savedPaymentMethodId,
		},
	})

	require.NoError(t, err, "no error becoming a supporter with a saved payment method")

	transactionDetails := getCCBillTransactionDetails(t, gqlClient, *becomeSupporter.BecomeClubSupporterWithAccountSavedPaymentMethod.CcbillTransactionToken)
	require.True(t, transactionDetails.CCBillTransactionDetails.Approved, "is approved transaction")

	// now, delete our saved payment method
	var deleteSavedPayment DeleteAccountSavedPaymentMethod

	err = gqlClient.Mutate(context.Background(), &deleteSavedPayment, map[string]interface{}{
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
	require.Equal(t, "2022-03-31 00:00:00 +0000 UTC", extendClubSupporterSubscription.ExtendAccountClubSupporterSubscription.ClubSupporterSubscription.NextBillingDate.String(), "should be extended")

	// cancel account club supporter subscription
	var cancel CancelAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &cancel, map[string]interface{}{
		"input": types.CancelAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
			CancellationReasonID:        relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.CancellationReason{}, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")))),
		},
	})

	require.NoError(t, err, "no error cancelling")
	require.NotNil(t, cancel.CancelAccountClubSupporterSubscription.ClubSupporterSubscription.CancellationReason, "cancellation reason is set")
}
