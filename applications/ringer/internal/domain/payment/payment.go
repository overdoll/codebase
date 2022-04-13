package payment

import (
	"overdoll/libraries/money"
	"time"
)

type Payment struct {
	id                string
	source            string
	status            string
	state             string
	sourceAccountId   string
	destinationClubId string

	baseAmount   int64
	baseCurrency money.Currency

	platformFeeAmount int64

	finalAmount int64

	isDeduction              bool
	deductionSourcePaymentId string

	settlementDate time.Time
}
