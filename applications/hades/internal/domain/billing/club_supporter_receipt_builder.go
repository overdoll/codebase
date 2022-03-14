package billing

import (
	"overdoll/libraries/uuid"
)

type ClubSupporterReceiptBuilder struct {
	history *AccountTransaction

	fileName string
}

func NewClubSupporterReceiptBuilder(history *AccountTransaction) (*ClubSupporterReceiptBuilder, error) {
	return &ClubSupporterReceiptBuilder{
		history: history,
	}, nil
}

func (c *ClubSupporterReceiptBuilder) AccountTransactionHistory() *AccountTransaction {
	return c.history
}

func (c *ClubSupporterReceiptBuilder) FileName() string {
	return c.fileName
}

func (c *ClubSupporterReceiptBuilder) BuildPDF() error {

	doc := newClubSupportReceiptPdf()

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
