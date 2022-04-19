package paxum

import (
	"errors"
	"overdoll/libraries/money"
)

type Transfer struct {
	email     string
	firstName string
	lastName  string
	amount    float64
}

func NewTransfer(email, firstName, lastName string, amount int64, currency money.Currency) (*Transfer, error) {
	if currency != money.USD {
		return nil, errors.New("invalid currency")
	}

	return &Transfer{
		email:     email,
		firstName: firstName,
		lastName:  lastName,
		amount:    float64(amount / 100),
	}, nil
}
