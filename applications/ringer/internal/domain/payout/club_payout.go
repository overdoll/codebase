package payout

import (
	"overdoll/libraries/domainerror"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrClubPayoutNotFound = domainerror.NewValidation("club payout not found")
)

type ClubPayout struct {
	*paging.Node

	id     string
	status Status
	clubId string

	payoutAccountId    string
	depositRequestId   string
	temporalWorkflowId string

	totalAmount    uint64
	coverFeeAmount uint64
	amount         uint64

	currency money.Currency

	createdAt   time.Time
	depositDate time.Time

	events []*ClubPayoutEvent
}

func NewQueuedPayout(depositRequestId string, accountMethod *AccountPayoutMethod, id, clubId, temporalWorkflowId string, amount uint64, currency money.Currency, timestamp time.Time, depositDate *time.Time) (*ClubPayout, error) {
	if depositDate == nil {
		dt := timestamp.AddDate(0, 0, 15)
		depositDate = &dt
	}

	var coverFeeAmount uint64

	if accountMethod.Method() == Paxum {
		coverFeeAmount = 25
	}

	return &ClubPayout{
		depositRequestId:   depositRequestId,
		payoutAccountId:    accountMethod.accountId,
		id:                 id,
		status:             Queued,
		clubId:             clubId,
		temporalWorkflowId: temporalWorkflowId,
		coverFeeAmount:     coverFeeAmount,
		amount:             amount,
		totalAmount:        amount + coverFeeAmount,
		depositDate:        *depositDate,
		currency:           currency,
		createdAt:          timestamp,
	}, nil
}

func (p *ClubPayout) Id() string {
	return p.id
}

func (p *ClubPayout) Status() Status {
	return p.status
}

func (p *ClubPayout) PayoutAccountId() string {
	return p.payoutAccountId
}

func (p *ClubPayout) TemporalWorkflowId() string {
	return p.temporalWorkflowId
}

func (p *ClubPayout) CoverFeeAmount() uint64 {
	return p.coverFeeAmount
}

func (p *ClubPayout) Amount() uint64 {
	return p.amount
}

func (p *ClubPayout) TotalAmount() uint64 {
	return p.totalAmount
}

func (p *ClubPayout) Currency() money.Currency {
	return p.currency
}

func (p *ClubPayout) ClubId() string {
	return p.clubId
}

func (p *ClubPayout) DepositRequestId() string {
	return p.depositRequestId
}

func (p *ClubPayout) DepositDate() time.Time {
	return p.depositDate
}

func (p *ClubPayout) CreatedAt() time.Time {
	return p.createdAt
}

func (p *ClubPayout) Events() []*ClubPayoutEvent {
	return p.events
}

func (p *ClubPayout) IsQueued() bool {
	return p.status == Queued
}

func (p *ClubPayout) IsProcessing() bool {
	return p.status == Processing
}

func (p *ClubPayout) IsFailed() bool {
	return p.status == Failed
}

func (p *ClubPayout) IsCancelled() bool {
	return p.status == Cancelled
}

func (p *ClubPayout) IsDeposited() bool {
	return p.status == Deposited
}

func (p *ClubPayout) MakeDeposited() error {
	p.status = Deposited
	return nil
}

func (p *ClubPayout) MakeFailed() error {
	p.status = Failed
	return nil
}

func (p *ClubPayout) MakeQueued(temporalWorkflowId string) error {
	p.status = Queued
	p.temporalWorkflowId = temporalWorkflowId
	return nil
}

func (p *ClubPayout) MakeCancelled() error {
	p.status = Cancelled
	return nil
}

func (p *ClubPayout) MakeProcessing() error {
	p.status = Processing
	return nil
}

func (p *ClubPayout) UpdateDepositDate(t time.Time) error {
	p.depositDate = t
	return nil
}

func (p *ClubPayout) CanCancel(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if p.status != Queued {
		return domainerror.NewValidation("can only cancel a queued payout")
	}

	return nil
}

func (p *ClubPayout) CanRetry(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if p.status != Failed {
		return domainerror.NewValidation("can only retry a failed payout")
	}

	return nil
}

func (p *ClubPayout) CanUpdateDepositDate(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if p.status != Queued {
		return domainerror.NewValidation("can only delay a queued payout")
	}

	return nil
}

func (p *ClubPayout) AddErrorEvent(s string, timestamp time.Time) error {
	evt, err := NewClubPayoutErrorEvent(s, timestamp)
	if err != nil {
		return err
	}
	p.events = append(p.events, evt)
	return nil
}

func UnmarshalClubPayoutFromDatabase(
	id string,
	status string,
	clubId string,
	currency string,
	amount uint64,
	coverFeeAmount uint64,
	totalAmount uint64,
	depositDate time.Time,
	accountPayoutMethodId string,
	depositRequestId string,
	createdAt time.Time,
	events []*ClubPayoutEvent,
	temporalWorkflowId string,
) *ClubPayout {
	st, _ := StatusFromString(status)
	cr, _ := money.CurrencyFromString(currency)
	return &ClubPayout{
		id:                 id,
		status:             st,
		clubId:             clubId,
		payoutAccountId:    accountPayoutMethodId,
		depositRequestId:   depositRequestId,
		temporalWorkflowId: temporalWorkflowId,
		amount:             amount,
		totalAmount:        totalAmount,
		coverFeeAmount:     coverFeeAmount,
		currency:           cr,
		createdAt:          createdAt,
		depositDate:        depositDate,
		events:             events,
	}
}
