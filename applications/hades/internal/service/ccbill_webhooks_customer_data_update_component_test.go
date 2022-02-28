package service_test

import (
	uuid2 "github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/uuid"
	"testing"
)

// test a bunch of webhooks at the same time
func TestBillingFlow_CustomerDataUpdate(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	ccbillSubscriptionId := uuid2.New().String()
	clubId := uuid.New().String()

	ccbillNewSaleSuccessWebhook(t, accountId, ccbillSubscriptionId, clubId)

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
	require.Equal(t, paymentMethod.Card.Last4, "5555", "correct last 4 digits on the card")
	require.Equal(t, paymentMethod.Card.Type, types.CardTypeVisa, "is a VISA card")
	require.Equal(t, paymentMethod.Card.Expiration, "01/2023", "correct expiration date")

	require.Equal(t, paymentMethod.BillingContact.Email, "nikita2@overdoll.com", "correct billing contact")
	require.Equal(t, paymentMethod.BillingContact.FirstName, "TTTT", "correct first name")
	require.Equal(t, paymentMethod.BillingContact.LastName, "AAAAAA", "correct last name")

	require.Equal(t, paymentMethod.BillingAddress.AddressLine1, "Test Address 2", "correct address")
	require.Equal(t, paymentMethod.BillingAddress.PostalCode, "M6G2V1", "correct postal code")
	require.Equal(t, paymentMethod.BillingAddress.Country, "CA", "correct country")
	require.Equal(t, paymentMethod.BillingAddress.State, "ON", "correct state")
	require.Equal(t, paymentMethod.BillingAddress.City, "Test City 2", "correct city")
}
