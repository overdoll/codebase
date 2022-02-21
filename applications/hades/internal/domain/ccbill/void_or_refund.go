package ccbill

import (
	"errors"
	"math"
	"time"
)

type VoidOrRefund struct {
	amount         *float64
	subscriptionId string
}

func CalculateProratedRefundAmount(originalAmount float64, lastBillingDate time.Time, nextBillingDate time.Time) float64 {

	// 30 days
	daysDifferenceBilling := nextBillingDate.Sub(lastBillingDate).Hours() / 24

	// something like 5 days
	daysDifferenceCurrent := nextBillingDate.Sub(time.Now()).Hours() / 24

	// get percentage difference, so maybe 0.4
	difference := daysDifferenceCurrent / daysDifferenceBilling

	// our final prorated amount, rounded down to 2 decimal places
	return math.Floor(originalAmount*difference*100) / 100
}

func NewVoidOrRefundWithCustomAmount(subscriptionId string, customAmount float64, actualAmount float64) (*VoidOrRefund, error) {

	if customAmount > actualAmount {
		return nil, errors.New("refund amount too high")
	}

	return &VoidOrRefund{
		amount:         nil,
		subscriptionId: subscriptionId,
	}, nil
}

func NewVoidOrRefundWithoutAmount(subscriptionId string) (*VoidOrRefund, error) {
	return &VoidOrRefund{
		amount:         nil,
		subscriptionId: subscriptionId,
	}, nil
}

func (v *VoidOrRefund) SubscriptionId() string {
	return v.subscriptionId
}

func (v *VoidOrRefund) Amount() *float64 {
	return v.amount
}
