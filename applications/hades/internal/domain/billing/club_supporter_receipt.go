package billing

import (
	"overdoll/libraries/domainerror"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
)

var (
	ErrClubSupporterReceiptNotFound = domainerror.NewValidation("club supporter receipt not found")
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

func CanCreateClubSupporterPaymentReceiptFromTransactionHistory(requester *principal.Principal, transaction *AccountTransaction) error {
	return requester.BelongsToAccount(transaction.accountId)
}

func CanCreateClubSupporterRefundReceiptFromTransactionHistory(requester *principal.Principal, transaction *AccountTransaction, eventId string) error {

	foundEvent := false

	for _, e := range transaction.events {
		if e.id == eventId {
			foundEvent = true
			break
		}
	}

	if !foundEvent {
		return errors.New("invalid event id")
	}

	return requester.BelongsToAccount(transaction.accountId)
}
