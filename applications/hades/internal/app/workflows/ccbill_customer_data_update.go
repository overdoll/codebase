package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type CCBillCustomerDataUpdateInput struct {
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

func CCBillCustomerDataUpdate(ctx workflow.Context, input CCBillCustomerDataUpdateInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// update with new payment details data
	if err := workflow.ExecuteActivity(ctx, a.UpdateCCBillSubscriptionDetails,
		activities.UpdateCCBillSubscriptionDetailsInput{
			CCBillSubscriptionId: input.SubscriptionId,
			CardBin:              input.Bin,
			CardType:             input.CardType,
			CardLast4:            input.Last4,
			CardExpirationDate:   input.ExpDate,
			FirstName:            input.FirstName,
			Email:                input.Email,
			LastName:             input.LastName,
			PhoneNumber:          input.PhoneNumber,
			AddressLine1:         input.Address1,
			City:                 input.City,
			Country:              input.Country,
			State:                input.State,
			PostalCode:           input.PostalCode,
			Timestamp:            input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
