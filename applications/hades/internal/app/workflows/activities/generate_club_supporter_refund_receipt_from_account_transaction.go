package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type GenerateClubSupporterRefundReceiptFromAccountTransactionInput struct {
	AccountTransactionId      string
	AccountTransactionEventId string
}

func (h *Activities) GenerateClubSupporterRefundReceiptFromAccountTransaction(ctx context.Context, input GenerateClubSupporterRefundReceiptFromAccountTransactionInput) error {

	transactionHistory, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.AccountTransactionId)

	if err != nil {
		return err
	}

	builder, err := billing.NewClubSupporterRefundReceiptBuilder(transactionHistory, input.AccountTransactionEventId)

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
