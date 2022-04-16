package payment

import (
	"overdoll/libraries/money"
)

type ClubBalance struct {
	clubId string

	amount   int64
	currency money.Currency
}

func NewDefaultBalance(clubId string) (*ClubBalance, error) {
	return &ClubBalance{
		clubId:   clubId,
		amount:   0,
		currency: money.USD,
	}, nil
}

func UnmarshalClubBalanceFromDatabase(clubId string, amount int64, currency string) *ClubBalance {
	cur, _ := money.CurrencyFromString(currency)
	return &ClubBalance{
		clubId:   clubId,
		amount:   amount,
		currency: cur,
	}
}
