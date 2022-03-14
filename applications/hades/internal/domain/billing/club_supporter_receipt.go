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

func CanCreateClubSupporterReceiptFromTransactionHistory(requester *principal.Principal, transaction *AccountTransaction) error {
	return requester.BelongsToAccount(transaction.accountId)
}
