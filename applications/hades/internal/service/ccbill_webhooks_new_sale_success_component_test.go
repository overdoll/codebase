package service_test

import (
	"context"
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/applications/hades/internal/ports/graphql/types"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type AccountTransactionHistoryNew struct {
	Entities []struct {
		Account struct {
			Id                 relay.ID
			TransactionHistory *struct {
				Edges []*struct {
					Node struct {
						Item struct {
							Id                            relay.ID
							Transaction                   types.AccountTransactionType
							Amount                        float64
							Currency                      types.Currency
							BilledAtDate                  time.Time
							NextBillingDate               time.Time
							PaymentMethod                 types.PaymentMethod
							CCBillSubscriptionTransaction types.CCBillSubscriptionTransaction `graphql:"ccbillSubscriptionTransaction"`
						} `graphql:"... on AccountNewTransactionHistory"`
					}
				}
			} `graphql:"transactionHistory(startDate: $startDate)"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type GenerateClubSupporterReceiptFromAccountTransactionHistory struct {
	GenerateClubSupporterReceiptFromAccountTransactionHistory *types.GenerateClubSupporterReceiptFromAccountTransactionHistoryPayload `graphql:"generateClubSupporterReceiptFromAccountTransactionHistory(input: $input)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_NewSaleSuccess(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	// generate a new unique payment token
	encrypted, err := ccbill.EncryptCCBillPayment(&hades.CCBillPayment{
		HeaderConfiguration: &hades.HeaderConfiguration{
			SavePaymentDetails: true,
			CreatedAt:          timestamppb.Now(),
		},
		CcbillClubSupporter: &hades.CCBillClubSupporter{
			ClubId: clubId,
		},
		AccountInitiator: &hades.AccountInitiator{
			AccountId: accountId,
		},
	})

	require.NoError(t, err, "no error encrypting a new token")

	workflow := workflows.CCBillNewSaleOrUpSaleSuccess
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

	runWebhookAction(t, "NewSaleSuccess", map[string]string{
		"accountingCurrency":             "USD",
		"accountingCurrencyCode":         "840",
		"accountingInitialPrice":         "6.99",
		"accountingRecurringPrice":       "6.99",
		"address1":                       "Test Address",
		"avsResponse":                    "Y",
		"billedCurrency":                 "USD",
		"billedCurrencyCode":             "840",
		"billedInitialPrice":             "6.99",
		"billedRecurringPrice":           "6.99",
		"bin":                            "411111",
		"cardType":                       "VISA",
		"city":                           "Test City",
		"clientAccnum":                   "951492",
		"clientSubacc":                   "0101",
		"country":                        "CA",
		"cvv2Response":                   "M",
		"dynamicPricingValidationDigest": "5e118a92ac1ff6cec8bbe64e13acb7c5",
		"email":                          "nikita@overdoll.com",
		"expDate":                        "0423",
		"firstName":                      "Test",
		"flexId":                         "d09af907-c198-44f2-b14e-eb9e1533cb45",
		"formName":                       "101 102",
		"initialPeriod":                  "30",
		"ipAddress":                      "192.168.1.1",
		"last4":                          "1111",
		"lastName":                       "Person",
		"nextRenewalDate":                "2022-03-28",
		"paymentAccount":                 "693a3b8d0d888c3d04800000004bacd",
		"paymentType":                    "CREDIT",
		"postalCode":                     "M4N5S1",
		"prePaid":                        "0",
		"priceDescription":               "$6.99(USD) for 30 days then $6.99(USD) recurring every 30 days",
		"rebills":                        "99",
		"recurringPeriod":                "30",
		"recurringPriceDescription":      "$6.99(USD) recurring every 30 days",
		"referringUrl":                   "none",
		"state":                          "NT",
		"subscriptionCurrency":           "USD",
		"subscriptionCurrencyCode":       "840",
		"subscriptionInitialPrice":       "6.99",
		"subscriptionRecurringPrice":     "6.99",
		"subscriptionTypeId":             "0000001458",
		"timestamp":                      "2022-02-26 08:21:49",
		"transactionId":                  "0222057601000107735",
		"threeDSecure":                   "NOT_APPLICABLE",
		"X-formDigest":                   "5e118a92ac1ff6cec8bbe64e13acb7c5",
		"X-currencyCode":                 "840",
		"subscriptionId":                 ccbillSubscriptionId,
		"X-overdollPaymentToken":         *encrypted,
	})

	args := testing_tools.GetArgumentsForWorkflowCall(t, temporalClientMock, workflow, mock.Anything)
	env := getWorkflowEnvironment(t)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflow, args...)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Edges[0]

	require.Equal(t, types.AccountClubSupporterSubscriptionStatusActive, subscription.Node.Status, "subscription is active")
	require.Equal(t, types.CurrencyUsd, subscription.Node.BillingCurrency, "USD currency is used")
	require.Equal(t, 6.99, subscription.Node.BillingAmount, "correct billing amount")
	require.Nil(t, subscription.Node.CancelledAt, "not cancelled")
	require.Equal(t, "2022-03-28 00:00:00 +0000 UTC", subscription.Node.NextBillingDate.String(), "correct next billing date")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, subscription.Node.PaymentMethod)

	accountSavedPayments := getAccountSavedPaymentMethods(t, gqlClient, accountId)

	require.Len(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges, 1, "should have 1 saved payment method available")

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.PaymentMethod)
	require.Equal(t, ccbillSubscriptionId, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.CcbillSubscription.CcbillSubscriptionID, "correct ccbill subscription id")

	ccbillSubscriptionDetails := getCCBillSubscriptionDetails(t, gqlClient, ccbillSubscriptionId)

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, ccbillSubscriptionDetails.PaymentMethod)

	require.Equal(t, 6.99, ccbillSubscriptionDetails.SubscriptionInitialPrice, "s: correct initial price")
	require.Equal(t, 6.99, ccbillSubscriptionDetails.SubscriptionRecurringPrice, "s: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.SubscriptionCurrency, "s: correct usd currency")

	require.Equal(t, 6.99, ccbillSubscriptionDetails.BilledInitialPrice, "b: correct initial price")
	require.Equal(t, 6.99, ccbillSubscriptionDetails.BilledRecurringPrice, "b: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.BilledCurrency, "b: correct usd currency")

	require.Equal(t, 6.99, ccbillSubscriptionDetails.AccountingInitialPrice, "a: correct initial price")
	require.Equal(t, 6.99, ccbillSubscriptionDetails.AccountingRecurringPrice, "a: correct recurring price")
	require.Equal(t, types.CurrencyUsd, ccbillSubscriptionDetails.AccountingCurrency, "a: correct usd currency")

	var accountTransactions AccountTransactionHistoryNew

	err = gqlClient.Query(context.Background(), &accountTransactions, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
		"startDate": time.Now(),
	})

	require.NoError(t, err, "no error grabbing account transaction history")

	require.Len(t, accountTransactions.Entities[0].Account.TransactionHistory.Edges, 1, "1 transaction item")

	transaction := accountTransactions.Entities[0].Account.TransactionHistory.Edges[0].Node.Item

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)

	require.Equal(t, types.AccountTransactionTypeClubSupporterSubscription, transaction.Transaction, "correct transaction type")
	require.Equal(t, 6.99, transaction.Amount, "correct amount")
	require.Equal(t, types.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, "2022-03-28 00:00:00 +0000 UTC", transaction.NextBillingDate.String(), "correct next billing date")
	require.Equal(t, "2022-02-26 00:00:00 +0000 UTC", transaction.BilledAtDate.String(), "correct billing date")

	generateReceiptWorkflow := workflows.GenerateClubSupporterReceiptFromAccountTransactionHistory
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, generateReceiptWorkflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

	flowRun := &mocks.WorkflowRun{}

	flowRun.
		On("Get", mock.Anything, mock.Anything).
		Return(nil)

	temporalClientMock.
		On("GetWorkflow", mock.Anything, mock.Anything, mock.Anything).
		// on GetWorkflow command, this would check if the workflow was completed
		// so we run our workflow to make sure it's completed
		Run(
			func(args mock.Arguments) {
				args = testing_tools.GetArgumentsForWorkflowCall(t, temporalClientMock, generateReceiptWorkflow, mock.Anything)
				env = getWorkflowEnvironment(t)
				// execute workflow manually since it won't be
				env.ExecuteWorkflow(generateReceiptWorkflow, args...)
				require.True(t, env.IsWorkflowCompleted())
				require.NoError(t, env.GetWorkflowError())
			},
		).
		Return(flowRun)

	var generateReceipt GenerateClubSupporterReceiptFromAccountTransactionHistory

	err = gqlClient.Mutate(context.Background(), &generateReceipt, map[string]interface{}{
		"input": types.GenerateClubSupporterReceiptFromAccountTransactionHistoryInput{
			TransactionHistoryID: transaction.Id,
		},
	})

	require.NoError(t, err, "no error generating a receipt from transaction history")

	fileUrl := generateReceipt.GenerateClubSupporterReceiptFromAccountTransactionHistory.Link.String()
	require.True(t, testing_tools.FileExists(fileUrl), "file should exist")
}

func assertNewSaleSuccessCorrectPaymentMethodDetails(t *testing.T, paymentMethod types.PaymentMethod) {
	require.Equal(t, "1111", paymentMethod.Card.Last4, "correct last 4 digits on the card")
	require.Equal(t, types.CardTypeVisa, paymentMethod.Card.Type, "is a VISA card")
	require.Equal(t, "04/2023", paymentMethod.Card.Expiration, "correct expiration date")

	require.Equal(t, "nikita@overdoll.com", paymentMethod.BillingContact.Email, "correct billing contact")
	require.Equal(t, "Test", paymentMethod.BillingContact.FirstName, "correct first name")
	require.Equal(t, "Person", paymentMethod.BillingContact.LastName, "correct last name")

	require.Equal(t, "Test Address", paymentMethod.BillingAddress.AddressLine1, "correct address")
	require.Equal(t, "M4N5S1", paymentMethod.BillingAddress.PostalCode, "correct postal code")
	require.Equal(t, "CA", paymentMethod.BillingAddress.Country, "correct country")
	require.Equal(t, "NT", paymentMethod.BillingAddress.State, "correct state")
	require.Equal(t, "Test City", paymentMethod.BillingAddress.City, "correct city")
}
