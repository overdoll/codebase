package billing

import (
	"math"
	"overdoll/libraries/money"
	"time"
)

type RefundAmount struct {
	proratedAmount uint64
	maxAmount      uint64
	currency       money.Currency
}

func newRefundAmountWithProrated(originalAmount uint64, currency money.Currency, lastBillingDate time.Time, nextBillingDate time.Time) (*RefundAmount, error) {

	// 30 days
	daysDifferenceBilling := nextBillingDate.Sub(lastBillingDate).Hours() / 24

	// something like 5 days
	daysDifferenceCurrent := nextBillingDate.Sub(time.Now()).Hours() / 24

	// get percentage difference, so maybe 0.4
	difference := daysDifferenceCurrent / daysDifferenceBilling

	var proratedAmount uint64

	if difference <= 0 {
		// if we got a negative difference, prorated should be 0 since the subscription already lapsed
		proratedAmount = 0
	} else {
		// our final prorated maxAmount, rounded down to 2 decimal places
		proratedAmount = uint64(math.Floor(float64(originalAmount) * difference * 100 / 100))
	}

	return &RefundAmount{
		maxAmount:      originalAmount,
		proratedAmount: proratedAmount,
		currency:       currency,
	}, nil
}

func (r *RefundAmount) ProratedAmount() uint64 {
	return r.proratedAmount
}

func (r *RefundAmount) MaxAmount() uint64 {
	return r.maxAmount
}

func (r *RefundAmount) Currency() money.Currency {
	return r.currency
}
