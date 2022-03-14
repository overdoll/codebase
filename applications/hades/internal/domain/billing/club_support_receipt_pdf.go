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
func (doc *ClubSupportReceiptPdf) Build(history *AccountTransaction) (*gofpdf.Fpdf, error) {

	// Build base doc
	doc.pdf.SetMargins(BaseMargin, BaseMarginTop, BaseMargin)
	doc.pdf.SetTextColor(
		35,
		35,
		35,
	)
	doc.pdf.SetCreationDate(history.Timestamp())

	doc.pdf.AddPage()
	doc.pdf.SetFont("Arial", "B", 16)

	// add small header
	doc.pdf.SetFont("Arial", "B", 16)
	doc.pdf.SetXY(10, BaseMarginTop+11)
	doc.pdf.Cell(40, 10, "Receipt")

	// receipt details
	doc.pdf.SetFont("Arial", "", 12)
	doc.pdf.SetXY(10, BaseMarginTop+19)
	doc.pdf.Cellf(40, 10, "Transaction # %s", history.accountId+"-"+history.id)

	doc.pdf.SetXY(10, BaseMarginTop+21)
	doc.pdf.Cellf(40, 10, "Date Paid %s", history.billedAtDate.Format("January 2, 2006"))

	doc.pdf.SetXY(10, BaseMarginTop+23)
	doc.pdf.Cellf(40, 10, "Payment Method %s", history.paymentMethod.Card().btype.String()+" - "+history.paymentMethod.Card().Last4())

	return doc.pdf, nil
}
