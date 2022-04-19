package payout

import (
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type AccountPayoutMethod struct {
	*paging.Node

	id         string
	accountId  string
	method     Method
	paxumEmail *string
	isDefault  bool
}

func NewPaxumAccountPayoutMethod(accountId, email string) (*AccountPayoutMethod, error) {
	return &AccountPayoutMethod{
		id:         uuid.New().String(),
		accountId:  accountId,
		method:     Paxum,
		paxumEmail: &email,
		isDefault:  false,
	}, nil
}

func (p *AccountPayoutMethod) Id() string {
	return p.id
}

func (p *AccountPayoutMethod) AccountId() string {
	return p.accountId
}

func (p *AccountPayoutMethod) Method() Method {
	return p.method
}

func (p *AccountPayoutMethod) IsDefault() bool {
	return p.isDefault
}

func (p *AccountPayoutMethod) PaxumEmail() *string {
	return p.paxumEmail
}

func (p *AccountPayoutMethod) Validate(amount int64, currency money.Currency) bool {

	// only opennode for now
	if p.method != Paxum {
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

func CanViewAccountPayoutMethods(accountId string, requester *principal.Principal) error {
	return requester.BelongsToAccount(accountId)
}

func UnmarshalAccountPayoutMethodFromDatabase(id, accountId, method string, paxumEmail *string, isDefault bool) *AccountPayoutMethod {
	m, _ := MethodFromString(method)
	return &AccountPayoutMethod{
		id:         id,
		accountId:  accountId,
		method:     m,
		paxumEmail: paxumEmail,
		isDefault:  isDefault,
	}
}
