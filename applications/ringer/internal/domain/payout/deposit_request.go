package payout

import (
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrDepositRequestNotFound = domainerror.NewValidation("deposit request not found")
)

type DepositRequest struct {
	*paging.Node

	id                      string
	lastDateForDeposit      time.Time
	baseAmount              uint64
	estimatedFeeAmount      uint64
	totalAmount             uint64
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
		totalAmount:             uint64(totalAmount),
		baseAmount:              0,
		estimatedFeeAmount:      uint64(estimatedFeeAmount),
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

func (p *DepositRequest) BaseAmount() uint64 {
	return p.baseAmount
}

func (p *DepositRequest) EstimatedFeeAmount() uint64 {
	return p.estimatedFeeAmount
}

func (p *DepositRequest) TotalAmount() uint64 {
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

func (p *DepositRequest) AppendPayoutAndAmount(payoutId string, amount uint64, currency money.Currency) error {

	if p.currency != currency {
		return domainerror.NewValidation("deposit cannot take this currency type")
	}

	foundPayout := false

	for _, pay := range p.payoutIds {
		if pay == payoutId {
			foundPayout = true
			break
		}
	}

	if foundPayout {
		return domainerror.NewValidation("cannot append payout and amount for existing payout")
	}

	if p.accountPayoutMethodKind == Paxum {
		// calculate fees for paxum
		p.baseAmount += amount
		// paxum has a fee of $1 for p2p transfers
		// paxum also has a fee of 25c when the transfer is received, so we cover it here
		fee := uint64(100) + uint64(25)
		p.estimatedFeeAmount += fee
		p.totalAmount += amount + fee
	}

	return nil
}

func UnmarshalDepositRequestFromDatabase(id string, lastDateForDeposit time.Time, baseAmount, estimatedFeeAmount, totalAmount uint64, payoutIds []string, currency string, accountPayoutMethodKind string, timestamp time.Time) *DepositRequest {
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
