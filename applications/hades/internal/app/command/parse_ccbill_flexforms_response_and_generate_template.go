package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type ParseCCBillFlexFormsResponseAndGenerateTemplate struct {
	PaymentToken         string
	CCBillSubscriptionId string
	CCBillResponseDigest string
	CCBillDenialId       string
	CCBillDeclineCode    string
	CCBillDeclineReason  string
}

type ParseCCBillFlexFormsResponseAndGenerateTemplateHandler struct{}

func NewParseCCBillFlexFormsResponseAndGenerateTemplate() ParseCCBillFlexFormsResponseAndGenerateTemplateHandler {
	return ParseCCBillFlexFormsResponseAndGenerateTemplateHandler{}
}

func (h ParseCCBillFlexFormsResponseAndGenerateTemplateHandler) Handle(ctx context.Context, cmd ParseCCBillFlexFormsResponseAndGenerateTemplate) (*string, error) {

	tm, err := ccbill.NewPaymentFlowCallbackTemplate(
		cmd.PaymentToken,
		cmd.CCBillSubscriptionId,
		cmd.CCBillResponseDigest,
		cmd.CCBillDenialId,
		cmd.CCBillDeclineCode,
		cmd.CCBillDeclineReason,
	)

	if err != nil {
		return nil, err
	}

	res, err := tm.GenerateTemplateString()

	if err != nil {
		return nil, err
	}

	return res, nil
}
