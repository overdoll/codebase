package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type GenerateCCBillFlexFormsPaymentLink struct {
	PaymentToken string
}

type GenerateCCBillFlexFormsPaymentLinkHandler struct{}

func NewGenerateCCBillFlexFormsPaymentLink() GenerateCCBillFlexFormsPaymentLinkHandler {
	return GenerateCCBillFlexFormsPaymentLinkHandler{}
}

func (h GenerateCCBillFlexFormsPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillFlexFormsPaymentLink) (*ccbill.FlexFormsPaymentLink, error) {

	paymentLink, err := ccbill.NewFlexFormsPaymentLinkFromEncryptedPaymentToken(cmd.PaymentToken)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
