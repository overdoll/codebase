package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateProratedRefundAmountForAccountTransaction struct {
	Principal     *principal.Principal
	TransactionId string
}

type GenerateProratedRefundAmountForAccountTransactionHandler struct {
	br billing.Repository
}

func NewGenerateProratedRefundAmountForAccountTransactionHandler(br billing.Repository) GenerateProratedRefundAmountForAccountTransactionHandler {
	return GenerateProratedRefundAmountForAccountTransactionHandler{br: br}
}

func (h GenerateProratedRefundAmountForAccountTransactionHandler) Handle(ctx context.Context, cmd GenerateProratedRefundAmountForAccountTransaction) (*billing.RefundAmount, error) {

	transaction, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.TransactionId)

	if err != nil {
		return nil, err
	}

	refund, err := transaction.GenerateProratedRefundAmount(cmd.Principal)

	if err != nil {
		return nil, err
	}

	return refund, nil
}
