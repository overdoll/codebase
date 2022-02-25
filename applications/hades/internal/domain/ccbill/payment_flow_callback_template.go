package ccbill

import (
	"bytes"
	"html/template"
)

type PaymentFlowCallbackTemplate struct {
}

func NewPaymentFlowCallbackTemplate() (*PaymentFlowCallbackTemplate, error) {
	return &PaymentFlowCallbackTemplate{}, nil
}

func (t *PaymentFlowCallbackTemplate) GenerateTemplateString() (*string, error) {

	te, err := template.ParseFiles("payment_flow_callback.gohtml")

	if err != nil {
		return nil, err
	}

	var tpl bytes.Buffer

	if err := te.Execute(&tpl, struct {
	}{}); err != nil {
		return nil, err
	}

	res := tpl.String()

	return &res, nil
}
