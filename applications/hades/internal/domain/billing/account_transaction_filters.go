package billing

import (
	"time"
)

type AccountTransactionHistoryFilters struct {
	accountId string
	from      time.Time
	to        *time.Time
}

func NewAccountTransactionHistoryFilters(accountId string, from time.Time, to *time.Time) (*AccountTransactionHistoryFilters, error) {
	return &AccountTransactionHistoryFilters{
		accountId: accountId,
		from:      from,
		to:        to,
	}, nil
}

func (e *AccountTransactionHistoryFilters) AccountId() string {
	return e.accountId
}

func (e *AccountTransactionHistoryFilters) From() time.Time {
	return e.from
}

func (e *AccountTransactionHistoryFilters) To() *time.Time {
	return e.to
}
