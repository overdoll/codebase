package billing

import (
	"time"
)

type AccountTransactionHistoryFilters struct {
	accountId                          *string
	accountClubSupporterSubscriptionId *string
	from                               *time.Time
	to                                 *time.Time
	transaction                        *Transaction
}

func NewAccountTransactionHistoryFilters(accountId, accountClubSupporterSubscriptionId *string, from *time.Time, to *time.Time, transaction *string) (*AccountTransactionHistoryFilters, error) {

	var trans *Transaction

	if transaction != nil {
		t, err := TransactionFromString(*transaction)
		if err != nil {
			return nil, err
		}
		trans = &t
	}

	return &AccountTransactionHistoryFilters{
		accountId:                          accountId,
		accountClubSupporterSubscriptionId: accountClubSupporterSubscriptionId,
		from:                               from,
		to:                                 to,
		transaction:                        trans,
	}, nil
}

func (e *AccountTransactionHistoryFilters) AccountId() *string {
	return e.accountId
}

func (e *AccountTransactionHistoryFilters) AccountClubSupporterSubscriptionId() *string {
	return e.accountClubSupporterSubscriptionId
}

func (e *AccountTransactionHistoryFilters) From() *time.Time {
	return e.from
}

func (e *AccountTransactionHistoryFilters) To() *time.Time {
	return e.to
}

func (e *AccountTransactionHistoryFilters) TransactionType() *Transaction {
	return e.transaction
}
