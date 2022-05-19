package activities

import (
	"context"
)

type GetCCBillTransactionDetailsPayload struct {
	TransactionId string
}

func (h *Activities) GetCCBillTransactionDetails(ctx context.Context, ccbillTransactionId string) (*GetCCBillTransactionDetailsPayload, error) {

	transaction, err := h.billing.GetAccountTransactionByCCBillTransactionIdOperator(ctx, ccbillTransactionId)

	if err != nil {
		return nil, err
	}

	return &GetCCBillTransactionDetailsPayload{
		TransactionId: transaction.Id(),
	}, nil
}
