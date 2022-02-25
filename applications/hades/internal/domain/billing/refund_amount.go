package billing

import (
	"math"
	"time"
)

type RefundAmount struct {
	proratedAmount float64
	maxAmount      float64
	currency       Currency
}

func NewRefundAmountWithProrated(originalAmount float64, currency Currency, lastBillingDate time.Time, nextBillingDate time.Time) (*RefundAmount, error) {

	// 30 days
	daysDifferenceBilling := nextBillingDate.Sub(lastBillingDate).Hours() / 24

	// something like 5 days
	daysDifferenceCurrent := nextBillingDate.Sub(time.Now()).Hours() / 24

	// get percentage difference, so maybe 0.4
	difference := daysDifferenceCurrent / daysDifferenceBilling

	// our final prorated maxAmount, rounded down to 2 decimal places
	proratedAmount := math.Floor(originalAmount*difference*100) / 100

	return &RefundAmount{
		maxAmount:      originalAmount,
		proratedAmount: proratedAmount,
		currency:       currency,
	}, nil
}

func (r *RefundAmount) ProratedAmount() float64 {
	return r.proratedAmount
}

func (r *RefundAmount) MaxAmount() float64 {
	return r.maxAmount
}

func (r *RefundAmount) Currency() Currency {
	return r.currency
}
