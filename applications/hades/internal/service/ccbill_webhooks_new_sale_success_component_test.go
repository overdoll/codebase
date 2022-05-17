package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/applications/hades/internal/ports/graphql/types"
	hades "overdoll/applications/hades/proto"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransaction struct {
	GenerateClubSupporterPaymentReceiptFromAccountTransaction *types.GenerateClubSupporterPaymentReceiptFromAccountTransactionPayload `graphql:"generateClubSupporterPaymentReceiptFromAccountTransaction(input: $input)"`
}

type AccountClubSupporterSubscription struct {
	AccountClubSupporterSubscription *struct {
		Item struct {
			NextBillingDate string
		} `graphql:"... on AccountActiveClubSupporterSubscription"`
	} `graphql:"accountClubSupporterSubscription(reference: $reference)"`
}

// test a bunch of webhooks at the same time
func TestBillingFlow_NewSaleSuccess(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid.New().String()
	ccbillTransactionId := uuid.New().String()
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

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.CCBillNewSaleOrUpSaleSuccess, mock.Anything)

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
		"transactionId":                  ccbillTransactionId,
		"threeDSecure":                   "NOT_APPLICABLE",
		"X-formDigest":                   "5e118a92ac1ff6cec8bbe64e13acb7c5",
		"X-currencyCode":                 "840",
		"subscriptionId":                 ccbillSubscriptionId,
		"X-overdollPaymentToken":         *encrypted,
	})

	env := getWorkflowEnvironment()
	env.RegisterWorkflow(workflows.UpcomingSubscriptionReminderNotification)
	env.SetDetachedChildWait(false)
	workflowExecution.FindAndExecuteWorkflow(t, env)

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	// get club supporter subscriptions
	subscriptions := getActiveAccountClubSupporterSubscriptions(t, gqlClient, accountId)
	require.Len(t, subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges, 1, "should have 1 subscription")

	subscription := subscriptions.Entities[0].Account.ClubSupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, graphql1.CurrencyUsd, subscription.BillingCurrency, "USD currency is used")
	require.Equal(t, 699, subscription.BillingAmount, "correct billing amount")
	require.Equal(t, "2022-03-28", subscription.NextBillingDate, "correct next billing date")

	var accountClubSupporterSub AccountClubSupporterSubscription

	err = gqlClient.Query(context.Background(), &accountClubSupporterSub, map[string]interface{}{
		"reference": graphql.String(subscription.Reference),
	})

	require.NoError(t, err, "no error looking up supporter subscription")
	require.NotNil(t, accountClubSupporterSub.AccountClubSupporterSubscription, "subscription exists")

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, subscription.PaymentMethod)

	accountSavedPayments := getAccountSavedPaymentMethods(t, gqlClient, accountId)

	require.Len(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges, 1, "should have 1 saved payment method available")

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.PaymentMethod)
	require.Equal(t, ccbillSubscriptionId, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.CcbillSubscription.CcbillSubscriptionID, "correct ccbill subscription id")

	ccbillSubscriptionDetails := getCCBillSubscriptionDetails(t, gqlClient, ccbillSubscriptionId)

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, ccbillSubscriptionDetails.PaymentMethod)

	require.Equal(t, 699, ccbillSubscriptionDetails.SubscriptionInitialPrice, "s: correct initial price")
	require.Equal(t, 699, ccbillSubscriptionDetails.SubscriptionRecurringPrice, "s: correct recurring price")
	require.Equal(t, graphql1.CurrencyUsd, ccbillSubscriptionDetails.SubscriptionCurrency, "s: correct usd currency")

	require.Equal(t, 699, ccbillSubscriptionDetails.BilledInitialPrice, "b: correct initial price")
	require.Equal(t, 699, ccbillSubscriptionDetails.BilledRecurringPrice, "b: correct recurring price")
	require.Equal(t, graphql1.CurrencyUsd, ccbillSubscriptionDetails.BilledCurrency, "b: correct usd currency")

	require.Equal(t, 699, ccbillSubscriptionDetails.AccountingInitialPrice, "a: correct initial price")
	require.Equal(t, 699, ccbillSubscriptionDetails.AccountingRecurringPrice, "a: correct recurring price")
	require.Equal(t, graphql1.CurrencyUsd, ccbillSubscriptionDetails.AccountingCurrency, "a: correct usd currency")

	accountTransactions := getAccountTransactions(t, gqlClient, accountId)

	require.Len(t, accountTransactions.Entities[0].Account.Transactions.Edges, 1, "1 transaction item")

	transaction := accountTransactions.Entities[0].Account.Transactions.Edges[0].Node

	// assert correct details about the payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, transaction.PaymentMethod)

	require.Equal(t, 1, accountTransactions.Entities[0].Account.TransactionsTotalCount, "correct total count")

	require.Equal(t, types.AccountTransactionTypePayment, transaction.Type, "correct transaction type")
	require.Equal(t, 699, transaction.Amount, "correct amount")
	require.Equal(t, graphql1.CurrencyUsd, transaction.Currency, "correct currency")
	require.Equal(t, "2022-03-28", transaction.NextBillingDate, "correct next billing date")
	require.Equal(t, "2022-02-26", transaction.BilledAtDate, "correct billing date")
	require.Equal(t, ccbillSubscriptionId, transaction.CcbillTransaction.CcbillSubscriptionID, "correct ccbill subscription id")
	require.Equal(t, ccbillTransactionId, *transaction.CcbillTransaction.CcbillTransactionID, "correct ccbill transaction id")

	receiptWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.GenerateClubSupporterPaymentReceiptFromAccountTransaction, mock.Anything)

	flowRun := &mocks.WorkflowRun{}

	flowRun.
		On("Get", mock.Anything, mock.Anything).
		Return(nil)

	application.TemporalClient.
		On("GetWorkflow", mock.Anything, "ClubSupporterPaymentReceipt_"+transaction.Reference, mock.Anything).
		// on GetWorkflow command, this would check if the workflow was completed
		// so we run our workflow to make sure it's completed
		Run(
			func(args mock.Arguments) {
				receiptWorkflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
			},
		).
		Return(flowRun)

	var generateReceipt GenerateClubSupporterPaymentReceiptFromAccountTransaction

	err = gqlClient.Mutate(context.Background(), &generateReceipt, map[string]interface{}{
		"input": types.GenerateClubSupporterPaymentReceiptFromAccountTransactionInput{
			TransactionID: transaction.Id,
		},
	})

	require.NoError(t, err, "no error generating a payment receipt from transaction")

	fileUrl := generateReceipt.GenerateClubSupporterPaymentReceiptFromAccountTransaction.Link.String()
	require.True(t, testing_tools.FileExists(fileUrl), "file should exist")

	// get subscriptions for the current club
	clubSubscriptions := getClubActiveAccountClubSupporterSubscriptions(t, gqlClient, clubId)
	require.Len(t, clubSubscriptions.Entities[0].Club.SupporterSubscriptions.Edges, 1, "should have 1 subscription")
	subscription = clubSubscriptions.Entities[0].Club.SupporterSubscriptions.Edges[0].Node.Item

	require.Equal(t, graphql1.CurrencyUsd, subscription.BillingCurrency, "USD currency is used")
	require.Equal(t, 699, subscription.BillingAmount, "correct billing amount")
	require.Equal(t, "2022-03-28", subscription.NextBillingDate, "correct next billing date")

	// check the club member subscription is visible
	clubMemberSubscription := getClubMemberSubscription(t, gqlClient, clubId, accountId)
	require.NotNil(t, clubMemberSubscription.Entities[0].ClubMember.ClubSupporterSubscription, "should have a subscription attached to the club member")
	require.Equal(t, subscription.Id, clubMemberSubscription.Entities[0].ClubMember.ClubSupporterSubscription.Item.Id, "should have a subscription attached to the club member")
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
