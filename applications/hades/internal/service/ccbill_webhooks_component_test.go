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
	"overdoll/libraries/money"
	"testing"
)

func ccbillNewSaleSuccessSeeder(t *testing.T, accountId, ccbillSubscriptionId, ccbillTransactionId, clubId string, customToken *string) {

	token := &hades.CCBillPayment{
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
	}

	env := getWorkflowEnvironment()
	env.SetDetachedChildWait(false)
	env.RegisterWorkflow(workflows.UpcomingSubscriptionReminderNotification)

	timestamp, err := ccbill.ParseCCBillDateWithTime("2022-02-26 08:21:49")
	require.NoError(t, err, "no error parsing time")

	billedAt, err := ccbill.ParseCCBillDate("2022-02-26")
	require.NoError(t, err, "no error parsing date")

	nextBilledAt, err := ccbill.ParseCCBillDate("2022-03-28")
	require.NoError(t, err, "no error parsing date")

	// execute a new sale success workflow so we can seed data for this test
	env.ExecuteWorkflow(workflows.CCBillNewSaleOrUpSaleSuccess, workflows.CCBillNewSaleOrUpSaleSuccessInput{
		SubscriptionId:             ccbillSubscriptionId,
		TransactionId:              ccbillTransactionId,
		AccountingInitialPrice:     699,
		AccountingRecurringPrice:   699,
		AccountingCurrency:         money.USD,
		SubscriptionInitialPrice:   699,
		SubscriptionRecurringPrice: 699,
		SubscriptionCurrency:       money.USD,
		BilledInitialPrice:         699,
		BilledRecurringPrice:       699,
		BilledCurrency:             money.USD,
		PaymentToken:               token,
		Timestamp:                  timestamp,
		NextBillingDate:            nextBilledAt,
		BilledAtDate:               billedAt,
		AddressLine1:               "Test Address",
		Bin:                        "411111",
		CardType:                   "VISA",
		City:                       "Test City",
		Country:                    "CA",
		Email:                      "nikita@overdoll.com",
		ExpDate:                    "0423",
		FirstName:                  "Test",
		Last4:                      "1111",
		LastName:                   "Person",
		PostalCode:                 "M4N5S1",
		State:                      "NT",
	})

	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	refreshAccountTransactionIndex(t)
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

	refreshSubscriptionsIndex(t)
	refreshAccountTransactionIndex(t)
}
