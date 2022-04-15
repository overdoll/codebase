package payout

import (
	"errors"
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

func (p *ClubPayout) MakeQueued() error {
	p.status = Queued
	return nil
}

func (p *ClubPayout) MakeCancelled() error {
	p.status = Cancelled
	return nil
}

func (p *ClubPayout) CanCancel() error {

	if p.status != Queued {
		return errors.New("can only cancel a queued payout")
	}

	return nil
}

func (p *ClubPayout) CanRetry() error {

	if p.status != Failed {
		return errors.New("can only retry a failed payout")
	}

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
