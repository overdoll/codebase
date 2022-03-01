package billing

import (
	"github.com/segmentio/ksuid"
)

type ClubSupporterReceiptBuilder struct {
	history *AccountTransactionHistory

	fileName string
}

func NewClubSupporterReceiptBuilder(history *AccountTransactionHistory) (*ClubSupporterReceiptBuilder, error) {
	return &ClubSupporterReceiptBuilder{
		history: history,
	}, nil
}

func (c *ClubSupporterReceiptBuilder) AccountTransactionHistory() *AccountTransactionHistory {
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

	fileName := ksuid.New().String() + ".pdf"

	if err := pdf.OutputFileAndClose(fileName); err != nil {
		return err
	}

	c.fileName = fileName

	return nil
}
