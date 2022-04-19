package payout

import (
	"overdoll/libraries/money"
	"time"
)

type DepositRequest struct {
	id                      string
	lastDateForDeposit      time.Time
	baseAmount              int64
	estimatedFeeAmount      int64
	totalAmount             int64
	currency                money.Currency
	accountPayoutMethodKind Method
}

func NewDepositRequest(id string, kind Method, lastDateForDeposit time.Time, currency money.Currency) (*DepositRequest, error) {
	return &DepositRequest{
		id:                      id,
		lastDateForDeposit:      lastDateForDeposit,
		totalAmount:             0,
		currency:                currency,
		accountPayoutMethodKind: kind,
	}, nil
}

func (p *DepositRequest) Id() string {
	return p.id
}

func (p *DepositRequest) AccountPayoutMethodKind() Method {
	return p.accountPayoutMethodKind
}
