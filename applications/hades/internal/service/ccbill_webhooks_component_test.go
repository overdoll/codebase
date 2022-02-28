package service_test

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	"net/http"
	"overdoll/applications/hades/internal/domain/ccbill"
	hades "overdoll/applications/hades/proto"
	"testing"
)

func ccbillNewSaleSuccessWebhook(t *testing.T, accountId, ccbillSubscriptionId, clubId string) {
	t.Parallel()

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
}

func runWebhookAction(t *testing.T, event string, payload interface{}) {
	res, err := json.Marshal(payload)
	require.NoError(t, err, "no error marshalling payload")

	req, err := http.NewRequest("POST", HadesHttpCCBillWebhookAddr+"?eventType="+event, bytes.NewBuffer(res))
	require.NoError(t, err, "no error creating a new request")

	cl := http.Client{}
	_, err = cl.Do(req)
	require.NoError(t, err, "no error doing webhook call")
}
