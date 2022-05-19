package billing

import (
	"time"
)

type AccountTransactionsFilters struct {
	accountId                          *string
	accountClubSupporterSubscriptionId *string
	from                               *time.Time
	to                                 *time.Time
	transaction                        *Transaction
}

func NewAccountTransactionsFilters(accountId, accountClubSupporterSubscriptionId *string, from *time.Time, to *time.Time, transaction *string) (*AccountTransactionsFilters, error) {

	var trans *Transaction

	if transaction != nil {
		t, err := TransactionFromString(*transaction)
		if err != nil {
			return nil, err
		}
		trans = &t
	}

	return &AccountTransactionsFilters{
		accountId:                          accountId,
		accountClubSupporterSubscriptionId: accountClubSupporterSubscriptionId,
		from:                               from,
		to:                                 to,
		transaction:                        trans,
	}, nil
}

func (e *AccountTransactionsFilters) AccountId() *string {
	return e.accountId
}

func (e *AccountTransactionsFilters) AccountClubSupporterSubscriptionId() *string {
	return e.accountClubSupporterSubscriptionId
}

func (e *AccountTransactionsFilters) From() *time.Time {
	return e.from
}

func (e *AccountTransactionsFilters) To() *time.Time {
	return e.to
}

func (e *AccountTransactionsFilters) TransactionType() *Transaction {
	return e.transaction
}
