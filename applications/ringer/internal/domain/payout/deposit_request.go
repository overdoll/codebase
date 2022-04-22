package payout

import (
	"errors"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrDepositRequestNotFound = errors.New("deposit request not found")
)

type DepositRequest struct {
	*paging.Node

	id                      string
	lastDateForDeposit      time.Time
	baseAmount              int64
	estimatedFeeAmount      int64
	totalAmount             int64
	payoutIds               []string
	currency                money.Currency
	accountPayoutMethodKind Method
	timestamp               time.Time
}

func NewDepositRequest(id string, kind Method, lastDateForDeposit time.Time, currency money.Currency, timestamp time.Time) (*DepositRequest, error) {

	estimatedFeeAmount := 0
	totalAmount := 0

	if kind == Paxum && currency == money.USD {
		// initial $50 fee to transfer money into our paxum wallet for outgoing payments
		estimatedFeeAmount = 5000
		totalAmount = 5000
	}

	return &DepositRequest{
		id:                      id,
		lastDateForDeposit:      lastDateForDeposit,
		totalAmount:             int64(totalAmount),
		baseAmount:              0,
		estimatedFeeAmount:      int64(estimatedFeeAmount),
		currency:                currency,
		accountPayoutMethodKind: kind,
		payoutIds:               nil,
		timestamp:               timestamp,
	}, nil
}

func (p *DepositRequest) Id() string {
	return p.id
}

func (p *DepositRequest) LastDateForDeposit() time.Time {
	return p.lastDateForDeposit
}

func (p *DepositRequest) BaseAmount() int64 {
	return p.baseAmount
}

func (p *DepositRequest) EstimatedFeeAmount() int64 {
	return p.estimatedFeeAmount
}

func (p *DepositRequest) TotalAmount() int64 {
	return p.totalAmount
}

func (p *DepositRequest) Currency() money.Currency {
	return p.currency
}

func (p *DepositRequest) PayoutIds() []string {
	return p.payoutIds
}

func (p *DepositRequest) AccountPayoutMethodKind() Method {
	return p.accountPayoutMethodKind
}

func (p *DepositRequest) Timestamp() time.Time {
	return p.timestamp
}

func (p *DepositRequest) IsPaxum() bool {
	return p.accountPayoutMethodKind == Paxum
}

func (p *DepositRequest) CanView(requester *principal.Principal) error {
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

func (p *DepositRequest) AppendPayoutAndAmount(payoutId string, amount int64, currency money.Currency) error {

	if p.currency != currency {
		return errors.New("deposit cannot take this currency type")
	}

	foundPayout := false

	for _, pay := range p.payoutIds {
		if pay == payoutId {
			foundPayout = true
			break
		}
	}

	if foundPayout {
		return errors.New("cannot append payout and amount for existing payout")
	}

	if p.accountPayoutMethodKind == Paxum {
		// calculate fees for paxum
		p.baseAmount += amount
		// paxum has a fee of $1 for p2p transfers
		p.estimatedFeeAmount += 100
		p.totalAmount += amount + 100
	}

	return nil
}

func UnmarshalDepositRequestFromDatabase(id string, lastDateForDeposit time.Time, baseAmount, estimatedFeeAmount, totalAmount int64, payoutIds []string, currency string, accountPayoutMethodKind string, timestamp time.Time) *DepositRequest {
	cr, _ := money.CurrencyFromString(currency)
	mt, _ := MethodFromString(accountPayoutMethodKind)

	return &DepositRequest{
		id:                      id,
		lastDateForDeposit:      lastDateForDeposit,
		baseAmount:              baseAmount,
		estimatedFeeAmount:      estimatedFeeAmount,
		totalAmount:             totalAmount,
		payoutIds:               payoutIds,
		currency:                cr,
		accountPayoutMethodKind: mt,
		timestamp:               timestamp,
	}
}

func CanViewDepositRequests(requester *principal.Principal) error {
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}
