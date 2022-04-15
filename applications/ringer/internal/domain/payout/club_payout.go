package payout

import (
	"overdoll/libraries/money"
	"time"
)

type ClubPayout struct {
	id     string
	status Status
	clubId string

	accountPayoutMethodId string

	amount   int64
	currency money.Currency

	timestamp time.Time

	events []*Event
}

func NewQueuedPayout(accountPayoutMethodId, id, clubId string, amount int64, currency money.Currency, timestamp time.Time) (*ClubPayout, error) {
	return &ClubPayout{
		accountPayoutMethodId: accountPayoutMethodId,
		id:                    id,
		status:                Queued,
		clubId:                clubId,
		amount:                amount,
		currency:              currency,
		timestamp:             timestamp,
	}, nil
}

func (p *ClubPayout) AccountPayoutMethodId() string {
	return p.accountPayoutMethodId
}

func (p *ClubPayout) Amount() int64 {
	return p.amount
}

func (p *ClubPayout) Currency() money.Currency {
	return p.currency
}

func (p *ClubPayout) MakeDeposited() error {
	p.status = Deposited
	return nil
}

func (p *ClubPayout) MakeFailed() error {
	p.status = Failed
	return nil
}

func (p *ClubPayout) AddErrorEvent(s string, timestamp time.Time) error {
	evt, err := NewErrorEvent(s, timestamp)
	if err != nil {
		return err
	}
	p.events = append(p.events, evt)
	return nil
}
