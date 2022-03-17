package billing

import (
	"overdoll/libraries/uuid"
)

type ClubSupporterPaymentReceiptBuilder struct {
	history *AccountTransaction

	fileName string
}

func NewClubSupporterPaymentReceiptBuilder(history *AccountTransaction) (*ClubSupporterPaymentReceiptBuilder, error) {
	return &ClubSupporterPaymentReceiptBuilder{
		history: history,
	}, nil
}

func (c *ClubSupporterPaymentReceiptBuilder) AccountTransaction() *AccountTransaction {
	return c.history
}

func (c *ClubSupporterPaymentReceiptBuilder) FileName() string {
	return c.fileName
}

func (c *ClubSupporterPaymentReceiptBuilder) BuildPDF() error {

	doc := newClubSupporterPaymentReceiptPdf()

	pdf, err := doc.Build(c.history)

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
