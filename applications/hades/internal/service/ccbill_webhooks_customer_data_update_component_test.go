package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_CustomerDataUpdate(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessSeeder(t, accountId, ccbillSubscriptionId, clubId, nil)

	workflow := workflows.CCBillCustomerDataUpdate
	testing_tools.MockWorkflowWithArgs(t, temporalClientMock, workflow, mock.Anything).Return(&mocks.WorkflowRun{}, nil)

	// run webhook - customer data update
	runWebhookAction(t, "CustomerDataUpdate", map[string]string{
		"address1":       "Test Address 2",
		"bin":            "411111",
		"cardType":       "VISA",
		"city":           "Test City 2",
		"clientAccnum":   "951492",
		"clientSubacc":   "0101",
		"country":        "CA",
		"email":          "nikita2@overdoll.com",
		"expDate":        "0123",
		"firstName":      "TTTT",
		"ipAddress":      "184.146.205.157",
		"lastName":       "AAAAAA",
		"paymentAccount": "693a3b8d0d888c3d04800000004bacd",
		"paymentType":    "CREDIT",
		"phoneNumber":    "2424214433",
		"postalCode":     "M6G2V1",
		"last4":          "5555",
		"state":          "ON",
		"subscriptionId": ccbillSubscriptionId,
		"timestamp":      "2022-02-24 20:21:37",
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

	// check for the correct payment method
	assertNewSaleSuccessCorrectPaymentMethodDetails(t, subscriptions.Edges[0].Node.PaymentMethod)

	accountSavedPayments := getAccountSavedPaymentMethods(t, gqlClient, accountId)

	// check saved payment methods
	require.Len(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges, 1, "should have 1 saved payment method available")

	// assert correct details about the payment method
	assertCustomerDataUpdateCorrectPaymentMethodDetails(t, accountSavedPayments.Entities[0].Account.SavedPaymentMethods.Edges[0].Node.PaymentMethod)
}

func assertCustomerDataUpdateCorrectPaymentMethodDetails(t *testing.T, paymentMethod types.PaymentMethod) {
	require.Equal(t, "5555", paymentMethod.Card.Last4, "correct last 4 digits on the card")
	require.Equal(t, types.CardTypeVisa, paymentMethod.Card.Type, "is a VISA card")
	require.Equal(t, "01/2023", paymentMethod.Card.Expiration, "correct expiration date")

	require.Equal(t, "nikita2@overdoll.com", paymentMethod.BillingContact.Email, "correct billing contact")
	require.Equal(t, "TTTT", paymentMethod.BillingContact.FirstName, "correct first name")
	require.Equal(t, "AAAAAA", paymentMethod.BillingContact.LastName, "correct last name")

	require.Equal(t, "Test Address 2", paymentMethod.BillingAddress.AddressLine1, "correct address")
	require.Equal(t, "M6G2V1", paymentMethod.BillingAddress.PostalCode, "correct postal code")
	require.Equal(t, "CA", paymentMethod.BillingAddress.Country, "correct country")
	require.Equal(t, "ON", paymentMethod.BillingAddress.State, "correct state")
	require.Equal(t, "Test City 2", paymentMethod.BillingAddress.City, "correct city")
}
