package paxum

import (
	"fmt"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
)

type Transfer struct {
	payoutId  string
	email     string
	firstName string
	lastName  string
	clubName  string
	amount    float64
}

func NewTransfer(payoutId string, clubName, email, firstName, lastName string, amount uint64, currency money.Currency) (*Transfer, error) {
	if currency != money.USD {
		return nil, domainerror.NewValidation("invalid currency")
	}

	return &Transfer{
		payoutId:  payoutId,
		email:     email,
		firstName: firstName,
		lastName:  lastName,
		clubName:  clubName,
		amount:    float64(amount) / 100,
	}, nil
}

func (t *Transfer) PayoutId() string {
	return t.payoutId
}

func (t *Transfer) Email() string {
	return t.email
}

func (t *Transfer) Note() string {
	return fmt.Sprintf("overdoll payout from \"%s\" incl. 0.25 USD fee. Payout reference #%s", t.clubName, t.payoutId)
}

func (t *Transfer) FirstName() string {
	return t.firstName
}

func (t *Transfer) ClubName() string {
	return t.clubName
}

func (t *Transfer) LastName() string {
	return t.lastName
}

func (t *Transfer) Amount() float64 {
	return t.amount
}

func (t *Transfer) Currency() string {
	return "USD"
}
