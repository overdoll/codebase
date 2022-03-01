package billing

import (
	"github.com/jung-kurt/gofpdf"
)

const (

	// BaseMargin define base margin used in documents
	BaseMargin float64 = 10

	// BaseMarginTop define base margin top used in documents
	BaseMarginTop float64 = 20
)

// ClubSupportReceiptPdf define base document
type ClubSupportReceiptPdf struct {
	pdf *gofpdf.Fpdf
}

func newClubSupportReceiptPdf() *ClubSupportReceiptPdf {
	return &ClubSupportReceiptPdf{pdf: gofpdf.New("P", "mm", "A4", "")}
}

// Build pdf document from data provided
func (doc *ClubSupportReceiptPdf) Build(history *AccountTransactionHistory) (*gofpdf.Fpdf, error) {

	// Build base doc
	doc.pdf.SetMargins(BaseMargin, BaseMarginTop, BaseMargin)
	doc.pdf.SetXY(10, 10)
	doc.pdf.SetTextColor(
		35,
		35,
		35,
	)

	doc.pdf.AddPage()
	doc.pdf.SetFont("Arial", "B", 16)

	doc.pdf.Cell(40, 10, history.accountId)

	doc.pdf.SetCreationDate(history.Timestamp())
	doc.pdf.SetCatalogSort(true)

	return doc.pdf, nil
}
