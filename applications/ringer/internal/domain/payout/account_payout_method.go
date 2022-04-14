package payout

import "overdoll/libraries/money"

type AccountPayoutMethod struct {
	id            string
	accountId     string
	kind          Kind
	opennodeEmail *string
	isDefault     bool
}

func (p *AccountPayoutMethod) Id() string {
	return p.id
}

func (p *AccountPayoutMethod) Kind() Kind {
	return p.kind
}

func (p *AccountPayoutMethod) IsDefault() bool {
	return p.isDefault
}

func (p *AccountPayoutMethod) OpennodeEmail() *string {
	return p.opennodeEmail
}

func (p *AccountPayoutMethod) Validate(amount int64, currency money.Currency) bool {

	// only opennode for now
	if p.kind != OpenNode {
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
