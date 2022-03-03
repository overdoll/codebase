package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type CCBillTransactionDetails struct {
	Principal *principal.Principal
	Token     string
}

type CCBillTransactionDetailsHandler struct{}

func NewCCBillTransactionDetailsHandler() CCBillTransactionDetailsHandler {
	return CCBillTransactionDetailsHandler{}
}

func (h CCBillTransactionDetailsHandler) Handle(ctx context.Context, query CCBillTransactionDetails) (*ccbill.TransactionDetails, error) {
	return ccbill.NewTransactionDetailsFromEncryptedToken(query.Principal, query.Token)
}
