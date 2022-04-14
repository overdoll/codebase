package payout

import (
	"overdoll/libraries/money"
	"time"
)

type Payout struct {
	id     string
	status Status
	clubId string

	accountPayoutMethodId string

	amount   int64
	currency money.Currency

	timestamp time.Time
}

func NewQueuedPayout(accountPayoutMethodId, id, clubId string, amount int64, currency money.Currency, timestamp time.Time) (*Payout, error) {
	return &Payout{
		accountPayoutMethodId: accountPayoutMethodId,
		id:                    id,
		status:                Queued,
		clubId:                clubId,
		amount:                amount,
		currency:              currency,
		timestamp:             timestamp,
	}, nil
}

func (p *Payout) AccountPayoutMethodId() string {
	return p.accountPayoutMethodId
}

func (p *Payout) Amount() int64 {
	return p.amount
}

func (p *Payout) Currency() money.Currency {
	return p.currency
}
