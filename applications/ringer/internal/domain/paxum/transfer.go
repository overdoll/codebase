package paxum

import (
	"errors"
	"overdoll/libraries/money"
)

type Transfer struct {
	email  string
	amount float64
}

func NewTransfer(email string, amount int64, currency money.Currency) (*Transfer, error) {
	if currency != money.USD {
		return nil, errors.New("invalid currency")
	}

	return &Transfer{
		email:  email,
		amount: float64(amount / 100),
	}, nil
}
