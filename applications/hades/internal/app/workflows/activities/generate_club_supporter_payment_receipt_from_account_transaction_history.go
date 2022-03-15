package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId string
}

func (h *Activities) GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory(ctx context.Context, input GenerateClubSupporterPaymentReceiptFromAccountTransactionHistoryInput) error {

	transactionHistory, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.AccountTransactionHistoryId)

	if err != nil {
		return err
	}

	builder, err := billing.NewClubSupporterPaymentReceiptBuilder(transactionHistory)

	if err != nil {
		return err
	}

	if err := builder.BuildPDF(); err != nil {
		return err
	}

	if err := h.fr.UpdateClubSupporterPaymentReceiptWithNewFile(ctx, builder); err != nil {
		return err
	}

	return nil
}
