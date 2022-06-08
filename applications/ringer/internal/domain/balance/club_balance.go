package balance

import (
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"time"
)

type ClubBalance struct {
	clubId string

	amount    int64
	currency  money.Currency
	updatedAt *time.Time
}

func NewDefaultBalance(clubId string) (*ClubBalance, error) {
	return &ClubBalance{
		clubId:    clubId,
		amount:    0,
		currency:  money.USD,
		updatedAt: nil,
	}, nil
}

func (b *ClubBalance) ClubId() string {
	return b.clubId
}

func (b *ClubBalance) Currency() money.Currency {
	return b.currency
}

func (b *ClubBalance) Amount() int64 {
	return b.amount
}

func (b *ClubBalance) Add(amount uint64, currency money.Currency) error {

	if currency != b.currency {
		return domainerror.NewValidation("invalid currency passed")
	}

	b.amount += int64(amount)

	return nil
}

func (b *ClubBalance) Deduct(amount uint64, currency money.Currency) error {

	if currency != b.currency {
		return domainerror.NewValidation("invalid currency passed")
	}

	b.amount -= int64(amount)

	return nil
}

func (b *ClubBalance) UpdatedAt() *time.Time {
	return b.updatedAt
}

func UnmarshalClubBalanceFromDatabase(clubId string, amount int64, currency string, updatedAt time.Time) *ClubBalance {
	cur, _ := money.CurrencyFromString(currency)
	return &ClubBalance{
		clubId:    clubId,
		amount:    amount,
		currency:  cur,
		updatedAt: &updatedAt,
	}
}
