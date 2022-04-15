package payout

import (
	"overdoll/libraries/money"
	"overdoll/libraries/uuid"
)

type AccountPayoutMethod struct {
	id            string
	accountId     string
	method        Method
	opennodeEmail *string
	isDefault     bool
}

func NewOpenNodeAccountPayoutMethod(accountId, email string) (*AccountPayoutMethod, error) {
	return &AccountPayoutMethod{
		id:            uuid.New().String(),
		accountId:     accountId,
		method:        OpenNode,
		opennodeEmail: &email,
		isDefault:     false,
	}, nil
}

func (p *AccountPayoutMethod) Id() string {
	return p.id
}

func (p *AccountPayoutMethod) Method() Method {
	return p.method
}

func (p *AccountPayoutMethod) IsDefault() bool {
	return p.isDefault
}

func (p *AccountPayoutMethod) OpennodeEmail() *string {
	return p.opennodeEmail
}

func (p *AccountPayoutMethod) Validate(amount int64, currency money.Currency) bool {

	// only opennode for now
	if p.method != OpenNode {
		return false
	}

	// we can only handle USD payouts at the moment
	if currency != money.USD {
		return false
	}

	// check threshold - at least $100 in ready payments
	if amount < 1000 {
		return false
	}

	return true
}
