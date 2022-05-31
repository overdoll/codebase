package ccbill

import (
	_ "embed"
	"google.golang.org/protobuf/types/known/timestamppb"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/errors"
	"time"
)

type ChargeByPreviousResult struct {
	paymentToken         string
	ccbillSubscriptionId string
	ccbillDenialId       string
	ccbillDeclineCode    string
	ccbillDeclineReason  string
	approved             bool
}

func NewChargeByPreviousResult(paymentToken, ccbillSubscriptionId, ccbillDenialId, ccbillDeclineCode, ccbillDeclineReason string, approved bool) (*ChargeByPreviousResult, error) {
	return &ChargeByPreviousResult{
		paymentToken:         paymentToken,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillDenialId:       ccbillDenialId,
		ccbillDeclineCode:    ccbillDeclineCode,
		ccbillDeclineReason:  ccbillDeclineReason,
		approved:             approved,
	}, nil
}

func (t *ChargeByPreviousResult) GenerateTransactionToken() (*string, error) {

	parsedToken, err := DecryptCCBillPayment(t.paymentToken)

	if err != nil {
		return nil, errors.Wrap(err, "error decrypting ccbill payment")
	}

	var ccbillTransactionDenied *hades.CCBillTransactionDenied
	var ccbillTransactionAuthorized *hades.CCBillTransactionAuthorized

	// transaction denied
	if !t.approved {
		ccbillTransactionDenied = &hades.CCBillTransactionDenied{
			Id:     t.ccbillDenialId,
			Code:   t.ccbillDeclineCode,
			Reason: t.ccbillDeclineReason,
		}
	}

	// transaction not denied, successful
	if t.approved {
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
		return nil, errors.Wrap(err, "error encrypting ccbill transaction")
	}

	return encrypted, nil
}
