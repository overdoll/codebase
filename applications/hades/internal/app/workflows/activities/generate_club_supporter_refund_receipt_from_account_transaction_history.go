package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
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

	builder, err := billing.NewClubSupporterRefundReceiptBuilder(transactionHistory, input.AccountTransactionHistoryEventId)

	if err != nil {
		return err
	}

	if err := builder.BuildPDF(); err != nil {
		return err
	}

	if err := h.fr.UpdateClubSupporterRefundReceiptWithNewFile(ctx, builder); err != nil {
		return err
	}

	return nil
}
