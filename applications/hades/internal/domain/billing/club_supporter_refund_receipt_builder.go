package billing

import (
	"overdoll/libraries/uuid"
)

type ClubSupporterRefundReceiptBuilder struct {
	history *AccountTransaction
	event   *AccountTransactionEvent

	fileName string
}

func NewClubSupporterRefundReceiptBuilder(history *AccountTransaction, eventId string) (*ClubSupporterRefundReceiptBuilder, error) {

	var event *AccountTransactionEvent

	for _, e := range history.events {
		if e.id == eventId {
			event = e
			break
		}
	}

	return &ClubSupporterRefundReceiptBuilder{
		history: history,
		event:   event,
	}, nil
}

func (c *ClubSupporterRefundReceiptBuilder) FileName() string {
	return c.fileName
}

func (c *ClubSupporterRefundReceiptBuilder) Event() *AccountTransactionEvent {
	return c.event
}

func (c *ClubSupporterRefundReceiptBuilder) AccountTransaction() *AccountTransaction {
	return c.history
}

func (c *ClubSupporterRefundReceiptBuilder) BuildPDF() error {

	doc := newClubSupporterRefundReceiptPdf()

	pdf, err := doc.Build(c.history, c.event)

	if err != nil {
		return err
	}

	fileName := uuid.New().String() + ".pdf"

	if err := pdf.OutputFileAndClose(fileName); err != nil {
		return err
	}

	c.fileName = fileName

	return nil
}
