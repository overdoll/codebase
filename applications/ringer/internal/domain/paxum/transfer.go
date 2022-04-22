package paxum

import (
	"errors"
	"overdoll/libraries/money"
)

type Transfer struct {
	payoutId  string
	email     string
	firstName string
	lastName  string
	amount    float64
}

func NewTransfer(payoutId string, email, firstName, lastName string, amount int64, currency money.Currency) (*Transfer, error) {
	if currency != money.USD {
		return nil, errors.New("invalid currency")
	}

	return &Transfer{
		payoutId:  payoutId,
		email:     email,
		firstName: firstName,
		lastName:  lastName,
		amount:    float64(amount) / 100,
	}, nil
}

func (t *Transfer) PayoutId() string {
	return t.payoutId
}

func (t *Transfer) Email() string {
	return t.email
}

func (t *Transfer) FirstName() string {
	return t.firstName
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
