package ccbill

import (
	"bytes"
	_ "embed"
	"errors"
	"google.golang.org/protobuf/types/known/timestamppb"
	"html/template"
	"os"
	hades "overdoll/applications/hades/proto"
	"time"
)

//go:embed payment_flow_callback.gohtml
var paymentFlowCallbackTemplate string

var (
	ErrSignatureCheckFailed = errors.New("signature check failed")
)

type paymentFlowCallbackTemplateVariables struct {
	Token  string
	Origin string
}

type PaymentFlowCallbackTemplate struct {
	paymentToken         string
	ccbillSubscriptionId string
	ccbillResponseDigest string
	ccbillDenialId       string
	ccbillDeclineCode    string
	ccbillDeclineReason  string
}

func NewPaymentFlowCallbackTemplate(paymentToken, ccbillSubscriptionId, ccbillResponseDigest, ccbillDenialId, ccbillDeclineCode, ccbillDeclineReason string) (*PaymentFlowCallbackTemplate, error) {
	return &PaymentFlowCallbackTemplate{
		paymentToken:         paymentToken,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillResponseDigest: ccbillResponseDigest,
		ccbillDenialId:       ccbillDenialId,
		ccbillDeclineCode:    ccbillDeclineCode,
		ccbillDeclineReason:  ccbillDeclineReason,
	}, nil
}

func (t *PaymentFlowCallbackTemplate) GenerateTemplateString() (*string, error) {

	parsedToken, err := DecryptCCBillPayment(t.paymentToken)

	if err != nil {
		return nil, err
	}

	var ccbillTransactionDenied *hades.CCBillTransactionDenied
	var ccbillTransactionAuthorized *hades.CCBillTransactionAuthorized

	// transaction denied
	if t.ccbillDenialId != "" {

		// verify digest before creating it
		if !validateCCBillTransactionDenied(t.ccbillResponseDigest, t.ccbillDenialId) {
			return nil, ErrSignatureCheckFailed
		}

		ccbillTransactionDenied = &hades.CCBillTransactionDenied{
			Id:     t.ccbillDenialId,
			Code:   t.ccbillDeclineCode,
			Reason: t.ccbillDeclineReason,
		}
	}

	// transaction not denied, successful
	if t.ccbillSubscriptionId != "" {

		// verify subscription ID digest
		if !validateCCBillTransactionAuthorized(t.ccbillResponseDigest, t.ccbillSubscriptionId) {
			return nil, ErrSignatureCheckFailed
		}

		ccbillTransactionAuthorized = &hades.CCBillTransactionAuthorized{
			SubscriptionId: t.ccbillSubscriptionId,
		}
	}

	if ccbillTransactionDenied != nil && ccbillTransactionAuthorized != nil {
		return nil, errors.New("unknown transaction state")
	}

	transaction := &hades.CCBillTransaction{
		TransactionHeader: &hades.TransactionHeader{
			CreatedAt: timestamppb.New(time.Now()),
		},
		CcbillPayment:               parsedToken,
		CcbillTransactionDenied:     ccbillTransactionDenied,
		CcbillTransactionAuthorized: ccbillTransactionAuthorized,
	}

	encrypted, err := encryptCCBillTransaction(transaction)

	if err != nil {
		return nil, err
	}

	te, err := template.New("payment_flow_callback").Parse(paymentFlowCallbackTemplate)

	if err != nil {
		return nil, err
	}

	var tpl bytes.Buffer

	if err := te.Execute(&tpl, paymentFlowCallbackTemplateVariables{
		Token:  *encrypted,
		Origin: os.Getenv("APP_URL"),
	}); err != nil {
		return nil, err
	}

	res := tpl.String()

	return &res, nil
}
