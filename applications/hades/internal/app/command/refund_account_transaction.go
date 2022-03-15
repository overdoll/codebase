package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type RefundAccountTransaction struct {
	Principal     *principal.Principal
	TransactionId string
	Amount        int64
}

type RefundAccountTransactionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewRefundAccountTransactionHandler(br billing.Repository, cr ccbill.Repository) RefundAccountTransactionHandler {
	return RefundAccountTransactionHandler{br: br, cr: cr}
}

func (h RefundAccountTransactionHandler) Handle(ctx context.Context, cmd RefundAccountTransaction) (*billing.AccountTransaction, error) {

	accountTransaction, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.TransactionId)

	if err != nil {
		return nil, err
	}

	if err := accountTransaction.RequestRefund(cmd.Principal, cmd.Amount); err != nil {
		return nil, err
	}

	refund, err := ccbill.NewRefundWithCustomAmount(
		*accountTransaction.CCBillSubscriptionId(),
		cmd.Amount,
		accountTransaction.Amount(),
		accountTransaction.Currency().String(),
	)

	if err != nil {
		return nil, err
	}

	if err := h.cr.RefundSubscription(ctx, refund); err != nil {
		return nil, err
	}

	return accountTransaction, nil
}
