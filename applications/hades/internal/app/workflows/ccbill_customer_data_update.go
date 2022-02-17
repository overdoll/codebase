package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillCustomerDataUpdatePayload struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	Address1       string `json:"address1"`
	City           string `json:"city"`
	State          string `json:"state"`
	Country        string `json:"country"`
	PostalCode     string `json:"postalCode"`
	LastName       string `json:"lastName"`
	FirstName      string `json:"firstName"`
	Email          string `json:"email"`
	PhoneNumber    string `json:"phoneNumber"`
	IpAddress      string `json:"ipAddress"`
	ReservationId  string `json:"reservationId"`
	PaymentType    string `json:"paymentType"`
	CardType       string `json:"cardType"`
	Last4          string `json:"last4"`
	Bin            string `json:"bin"`
	ExpDate        string `json:"expDate"`
	PaymentAccount string `json:"paymentAccount"`
}

func CCBillCustomerDataUpdate(ctx workflow.Context, payload CCBillCustomerDataUpdatePayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var subscriptionDetails *activities.GetCCBillSubscriptionDetailsPayload

	// get subscription details so we know the club
	if err := workflow.ExecuteActivity(ctx, a.GetCCBillSubscriptionDetails, payload.SubscriptionId).Get(ctx, &subscriptionDetails); err != nil {
		return err
	}

	// update with new payment details data
	if err := workflow.ExecuteActivity(ctx, a.UpdatePaymentMethodDetails,
		activities.UpdatePaymentMethodDetails{
			CCBillSubscriptionId: payload.SubscriptionId,
			AccountId:            subscriptionDetails.AccountId,
			ClubId:               subscriptionDetails.ClubId,
			CardBin:              payload.Bin,
			CardType:             payload.CardType,
			CardLast4:            payload.Last4,
			CardExpirationDate:   payload.ExpDate,
			FirstName:            payload.FirstName,
			Email:                payload.Email,
			LastName:             payload.LastName,
			PhoneNumber:          payload.PhoneNumber,
			AddressLine1:         payload.Address1,
			City:                 payload.City,
			Country:              payload.Country,
			State:                payload.State,
			PostalCode:           payload.PostalCode,
			Timestamp:            payload.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
