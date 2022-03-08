package service_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	"io"
	"net/http"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/domain/ccbill"
	hades "overdoll/applications/hades/proto"
	"testing"
)

func ccbillNewSaleSuccessSeeder(t *testing.T, accountId, ccbillSubscriptionId, clubId string, customToken *string) {

	var token *string

	if customToken != nil {
		token = customToken
	} else {
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

		token = encrypted
	}

	env := getWorkflowEnvironment(t)

	// execute a new sale success workflow so we can seed data for this test
	env.ExecuteWorkflow(workflows.CCBillNewSaleOrUpSaleSuccess, workflows.CCBillNewSaleOrUpsaleSuccessInput{
		AccountingCurrency:             "USD",
		AccountingCurrencyCode:         "840",
		AccountingInitialPrice:         "6.99",
		AccountingRecurringPrice:       "6.99",
		Address1:                       "Test Address",
		BilledCurrency:                 "USD",
		BilledCurrencyCode:             "840",
		BilledInitialPrice:             "6.99",
		BilledRecurringPrice:           "6.99",
		Bin:                            "411111",
		CardType:                       "VISA",
		City:                           "Test City",
		ClientAccnum:                   "951492",
		ClientSubacc:                   "0101",
		Country:                        "CA",
		DynamicPricingValidationDigest: "5e118a92ac1ff6cec8bbe64e13acb7c5",
		Email:                          "nikita@overdoll.com",
		ExpDate:                        "0423",
		FirstName:                      "Test",
		FlexId:                         "d09af907-c198-44f2-b14e-eb9e1533cb45",
		FormName:                       "101 102",
		InitialPeriod:                  "30",
		IpAddress:                      "192.168.1.1",
		Last4:                          "1111",
		LastName:                       "Person",
		NextRenewalDate:                "2022-03-28",
		PaymentAccount:                 "693a3b8d0d888c3d04800000004bacd",
		PaymentType:                    "CREDIT",
		PostalCode:                     "M4N5S1",
		PriceDescription:               "$6.99(USD) for 30 days then $6.99(USD) recurring every 30 days",
		Rebills:                        "99",
		RecurringPeriod:                "30",
		RecurringPriceDescription:      "$6.99(USD) recurring every 30 days",
		ReferringUrl:                   "none",
		State:                          "NT",
		SubscriptionCurrency:           "USD",
		SubscriptionCurrencyCode:       "840",
		SubscriptionInitialPrice:       "6.99",
		SubscriptionRecurringPrice:     "6.99",
		SubscriptionTypeId:             "0000001458",
		Timestamp:                      "2022-02-26 08:21:49",
		TransactionId:                  "0222057601000107735",
		XFormDigest:                    "5e118a92ac1ff6cec8bbe64e13acb7c5",
		XCurrencyCode:                  "840",
		SubscriptionId:                 ccbillSubscriptionId,
		XOverdollPaymentToken:          *token,
	})

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
}

func runWebhookAction(t *testing.T, event string, payload interface{}) {
	res, err := json.Marshal(payload)
	require.NoError(t, err, "no error marshalling payload")

	req, err := http.NewRequest("POST", HadesHttpCCBillWebhookAddr+"?eventType="+event, bytes.NewBuffer(res))
	require.NoError(t, err, "no error creating a new request")

	cl := http.Client{}
	response, err := cl.Do(req)
	require.NoError(t, err, "no error doing webhook call")

	b, err := io.ReadAll(response.Body)

	require.Equal(t, 200, response.StatusCode, fmt.Sprintf("error calling webhook: %s", string(b)))
}
