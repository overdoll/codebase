package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillRenewalFailurePayload struct {
	TransactionId  string `json:"transactionId"`
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	RenewalDate    string `json:"renewalDate"`
	CardType       string `json:"cardType"`
	PaymentType    string `json:"paymentType"`
	NextRetryDate  string `json:"nextRetryDate"`
	FailureReason  string `json:"failureReason"`
	FailureCode    string `json:"failureCode"`
}

func CCBillRenewalFailure(ctx workflow.Context, payload CCBillRenewalFailurePayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// create record for failed transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateFailedClubSubscriptionAccountTransactionRecord,
		activities.CreateFailedClubSubscriptionAccountTransactionRecord{
			NextRetryDate:        payload.NextRetryDate,
			FailureReason:        payload.FailureReason,
			FailureCode:          payload.FailureCode,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CCBillSubscriptionId: payload.SubscriptionId,
			Timestamp:            payload.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
