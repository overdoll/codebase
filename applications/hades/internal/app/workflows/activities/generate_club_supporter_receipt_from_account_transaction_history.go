package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

func (h *Activities) GenerateClubSupporterReceiptFromAccountTransactionHistory(ctx context.Context, accountTransactionHistoryId string) error {

	transactionHistory, err := h.billing.GetAccountTransactionHistoryByIdOperator(ctx, accountTransactionHistoryId)

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
