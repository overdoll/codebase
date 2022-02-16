package workflows

import (
	"go.temporal.io/sdk/workflow"
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
	ExpDate        string `json:"expDate"`
	PaymentAccount string `json:"paymentAccount"`
}

func CCBillCustomerDataUpdate(ctx workflow.Context, payload CCBillCustomerDataUpdatePayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
