package payout

import (
	"errors"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var (
	ErrAccountPayoutMethodNotFound = errors.New("account payout method not found")
)

type AccountPayoutMethod struct {
	*paging.Node

	accountId  string
	method     Method
	paxumEmail *string
}

func NewPaxumAccountPayoutMethod(requester *principal.Principal, accountId, email string) (*AccountPayoutMethod, error) {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return nil, err
	}

	if !requester.IsArtist() {
		return nil, principal.ErrNotAuthorized
	}

	return &AccountPayoutMethod{
		accountId:  accountId,
		method:     Paxum,
		paxumEmail: &email,
	}, nil
}

func (p *AccountPayoutMethod) AccountId() string {
	return p.accountId
}

func (p *AccountPayoutMethod) Method() Method {
	return p.method
}

func (p *AccountPayoutMethod) PaxumEmail() *string {
	return p.paxumEmail
}

func (p *AccountPayoutMethod) IsPaxum() bool {
	return p.method == Paxum
}

func (p *AccountPayoutMethod) CanDelete(requester *principal.Principal) error {
	return requester.BelongsToAccount(p.accountId)
}

func (p *AccountPayoutMethod) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(p.accountId)
}

func (p *AccountPayoutMethod) Validate(requester *principal.Principal, amount int64, currency money.Currency) bool {

	if err := requester.BelongsToAccount(p.accountId); err != nil {
		return false
	}

	// locked accounts cannot receive payouts
	if requester.IsLocked() {
		return false
	}

	// only opennode for now
	if p.method != Paxum {
		return false
	}

	// we can only handle USD payouts at the moment
	if currency != money.USD {
		return false
	}

	// check threshold - at least $100 in ready payments
	// TODO: remove temporary field here after testing is done
	if amount < 5 {
		return false
	}

	return true
}

func UnmarshalAccountPayoutMethodFromDatabase(accountId, method string, paxumEmail *string) *AccountPayoutMethod {
	m, _ := MethodFromString(method)
	return &AccountPayoutMethod{
		accountId:  accountId,
		method:     m,
		paxumEmail: paxumEmail,
	}
}
