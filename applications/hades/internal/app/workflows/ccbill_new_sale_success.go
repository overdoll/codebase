package workflows

import (
	"go.temporal.io/sdk/workflow"
)

type CCBillNewSaleSuccessPayload struct {
	AccountingCurrency             string `json:"accountingCurrency"`
	AccountingCurrencyCode         string `json:"accountingCurrencyCode"`
	AccountingInitialPrice         string `json:"accountingInitialPrice"`
	AccountingRecurringPrice       string `json:"accountingRecurringPrice"`
	Address1                       string `json:"address1"`
	BilledCurrency                 string `json:"billedCurrency"`
	BilledCurrencyCode             string `json:"billedCurrencyCode"`
	BilledInitialPrice             string `json:"billedInitialPrice"`
	BilledRecurringPrice           string `json:"billedRecurringPrice"`
	Bin                            string `json:"bin"`
	CardType                       string `json:"cardType"`
	City                           string `json:"city"`
	ClientAccnum                   string `json:"clientAccnum"`
	ClientSubacc                   string `json:"clientSubacc"`
	Country                        string `json:"country"`
	DynamicPricingValidationDigest string `json:"dynamicPricingValidationDigest"`
	Email                          string `json:"email"`
	ExpDate                        string `json:"expDate"`
	FirstName                      string `json:"firstName"`
	FlexId                         string `json:"flexId"`
	FormName                       string `json:"formName"`
	InitialPeriod                  string `json:"initialPeriod"`
	IpAddress                      string `json:"ipAddress"`
	Last4                          string `json:"last4"`
	LastName                       string `json:"lastName"`
	PhoneNumber                    string `json:"phoneNumber"`
	NextRenewalDate                string `json:"nextRenewalDate"`
	PaymentAccount                 string `json:"paymentAccount"`
	PaymentType                    string `json:"paymentType"`
	PostalCode                     string `json:"postalCode"`
	PriceDescription               string `json:"priceDescription"`
	Rebills                        string `json:"rebills"`
	RecurringPeriod                string `json:"recurringPeriod"`
	RecurringPriceDescription      string `json:"recurringPriceDescription"`
	ReferringUrl                   string `json:"referringUrl"`
	State                          string `json:"state"`
	SubscriptionCurrency           string `json:"subscriptionCurrency"`
	SubscriptionCurrencyCode       string `json:"subscriptionCurrencyCode"`
	SubscriptionId                 string `json:"subscriptionId"`
	SubscriptionInitialPrice       string `json:"subscriptionInitialPrice"`
	SubscriptionRecurringPrice     string `json:"subscriptionRecurringPrice"`
	SubscriptionTypeId             string `json:"subscriptionTypeId"`
	Timestamp                      string `json:"timestamp"`
	TransactionId                  string `json:"transactionId"`
	XFormDigest                    string `json:"X-formDigest"`
	XCurrencyCode                  string `json:"X-currencyCode"`
	XOverdollLocker                string `json:"X-overdollLocker"`
}

func CCBillNewSaleSuccess(ctx workflow.Context, payload CCBillNewSaleSuccessPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	return nil
}
