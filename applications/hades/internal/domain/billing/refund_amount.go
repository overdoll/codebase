package billing

import (
	"math"
	"time"
)

type RefundAmount struct {
	proratedAmount float64
	amount         float64
	currency       Currency
}

func NewRefundAmountWithProrated(originalAmount float64, currency Currency, lastBillingDate time.Time, nextBillingDate time.Time) (*RefundAmount, error) {

	// 30 days
	daysDifferenceBilling := nextBillingDate.Sub(lastBillingDate).Hours() / 24

	// something like 5 days
	daysDifferenceCurrent := nextBillingDate.Sub(time.Now()).Hours() / 24

	// get percentage difference, so maybe 0.4
	difference := daysDifferenceCurrent / daysDifferenceBilling

	// our final prorated amount, rounded down to 2 decimal places
	proratedAmount := math.Floor(originalAmount*difference*100) / 100

	return &RefundAmount{
		amount:         originalAmount,
		proratedAmount: proratedAmount,
		currency:       currency,
	}, nil
}
