package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransactionInput struct {
	AccountTransactionId string
}

func (h *Activities) GenerateClubSupporterPaymentReceiptFromAccountTransaction(ctx context.Context, input GenerateClubSupporterPaymentReceiptFromAccountTransactionInput) error {

	transactionHistory, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.AccountTransactionId)

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
