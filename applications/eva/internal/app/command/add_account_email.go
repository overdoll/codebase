package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type AddAccountEmail struct {
	Principal *principal.Principal
	Email     string
}

type AddAccountEmailHandler struct {
	ar      account.Repository
	carrier CarrierService
}

func NewAddAccountEmailHandler(ar account.Repository, carrier CarrierService) AddAccountEmailHandler {
	return AddAccountEmailHandler{ar: ar, carrier: carrier}
}

func (h AddAccountEmailHandler) Handle(ctx context.Context, cmd AddAccountEmail) (*account.Email, error) {

	acc, err := h.ar.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	// create new confirmation instance
	confirm, err := account.NewEmailConfirmation(cmd.Email)

	if err != nil {
		return nil, err
	}

	em, err := h.ar.AddAccountEmail(ctx, acc, confirm)

	if err != nil {
		return nil, err
	}

	// tell carrier to send a notification email
	if err := h.carrier.ConfirmAccountEmail(ctx, cmd.AccountId, cmd.Email, confirm.ID()); err != nil {
		return nil, err
	}

	return em, nil
}
