package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
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
			Item struct {
				NextBillingDate string
			} `graphql:"... on AccountActiveClubSupporterSubscription"`
		}
	} `graphql:"extendAccountClubSupporterSubscription(input: $input)"`
}

type CancelAccountClubSupporterSubscription struct {
	CancelAccountClubSupporterSubscription *struct {
		ClubSupporterSubscription *struct {
			Item struct {
				NextBillingDate string
			} `graphql:"... on AccountActiveClubSupporterSubscription"`
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
	savedPaymentMethodId := relay.ID(relay.MarshalRelayId(relay.NewID(types.AccountSavedPaymentMethod{}, accountId, ccbillSubscriptionId)))

	mockAccountStaff(t, accountId)
	mockAccountDigest(t, accountId, "")

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	subscriptions := getActiveAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	accountClubSupporterSubscriptionId := subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item.Id

	var becomeSupporter BecomeClubSupporterWithAccountSavedPaymentMethod

	err := gqlClient.Mutate(context.Background(), &becomeSupporter, map[string]interface{}{
		"input": types.BecomeClubSupporterWithAccountSavedPaymentMethodInput{
			ClubID:               convertClubIdIdToRelayId(clubId),
			Currency:             graphql1.CurrencyUsd,
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
	require.Equal(t, "2022-03-31", extendClubSupporterSubscription.ExtendAccountClubSupporterSubscription.ClubSupporterSubscription.Item.NextBillingDate, "should be extended")

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.CancelAccountClubSupporterSubscription, mock.Anything)

	// cancel account club supporter subscription
	var cancel CancelAccountClubSupporterSubscription

	err = gqlClient.Mutate(context.Background(), &cancel, map[string]interface{}{
		"input": types.CancelAccountClubSupporterSubscriptionInput{
			ClubSupporterSubscriptionID: accountClubSupporterSubscriptionId,
			CancellationReasonID:        relay.ID(relay.MarshalRelayId(relay.NewID(types.CancellationReason{}, "1q7MJ5IyRTV0X4J27F3m5wGD5mj"))),
		},
	})

	require.NoError(t, err, "no error cancelling")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
}
