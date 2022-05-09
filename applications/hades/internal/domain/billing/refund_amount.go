package billing

import (
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
	difference := uint64(daysDifferenceCurrent / daysDifferenceBilling)

	// our final prorated maxAmount, rounded down to 2 decimal places
	proratedAmount := originalAmount * difference * 100 / 100

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
