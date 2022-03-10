package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type GenerateClubSupporterReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId string
}

func (h *Activities) GenerateClubSupporterReceiptFromAccountTransactionHistory(ctx context.Context, input GenerateClubSupporterReceiptFromAccountTransactionHistoryInput) error {

	transactionHistory, err := h.billing.GetAccountTransactionHistoryByIdOperator(ctx, input.AccountTransactionHistoryId)

	if err != nil {
		return err
	}

	builder, err := billing.NewClubSupporterReceiptBuilder(transactionHistory)

	if err != nil {
		return err
	}

	if err := builder.BuildPDF(); err != nil {
		return err
	}

	if err := h.fr.UpdateClubSupporterReceiptWithNewFile(ctx, builder); err != nil {
		return err
	}

	return nil
}
