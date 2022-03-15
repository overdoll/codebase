package activities

import (
	"context"
)

type GenerateClubSupporterRefundReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId      string
	AccountTransactionHistoryEventId string
}

func (h *Activities) GenerateClubSupporterRefundReceiptFromAccountTransactionHistory(ctx context.Context, input GenerateClubSupporterRefundReceiptFromAccountTransactionHistoryInput) error {

	transactionHistory, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.AccountTransactionHistoryId)

	if err != nil {
		return err
	}

	return nil
}
