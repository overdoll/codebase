package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type VoidAccountTransaction struct {
	Principal     *principal.Principal
	TransactionId string
}

type VoidAccountTransactionHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewVoidAccountTransactionHandler(br billing.Repository, cr ccbill.Repository) VoidAccountTransactionHandler {
	return VoidAccountTransactionHandler{br: br, cr: cr}
}

func (h VoidAccountTransactionHandler) Handle(ctx context.Context, cmd VoidAccountTransaction) error {

	accountTransaction, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.TransactionId)

	if err != nil {
		return err
	}

	if err := accountTransaction.RequestVoid(cmd.Principal); err != nil {
		return err
	}

	if err := h.cr.VoidSubscription(ctx, *accountTransaction.CCBillSubscriptionId()); err != nil {
		return err
	}

	return nil
}
