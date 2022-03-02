package billing

import (
	"errors"
	"overdoll/libraries/principal"
)

var (
	ErrClubSupporterReceiptNotFound = errors.New("club supporter receipt not found")
)

type ClubSupporterReceipt struct {
	link string
}

func (c *ClubSupporterReceipt) Link() string {
	return c.link
}

func UnmarshalClubSupporterReceiptFromDatabase(link string) *ClubSupporterReceipt {
	return &ClubSupporterReceipt{link: link}
}

func CanCreateClubSupporterReceiptFromTransactionHistory(requester *principal.Principal, transaction *AccountTransactionHistory) error {

	if transaction.transaction != New && transaction.transaction != Invoice {
		return errors.New("can only generate a receipt from a new or invoice transaction type")
	}

	return requester.BelongsToAccount(transaction.accountId)
}
