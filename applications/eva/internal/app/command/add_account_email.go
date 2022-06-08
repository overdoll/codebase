package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/confirm_email"
	"overdoll/libraries/principal"
)

type AddAccountEmail struct {
	Principal *principal.Principal
	Email     string
}

type AddAccountEmailHandler struct {
	ar      account.Repository
	cer     confirm_email.Repository
	carrier CarrierService
}

func NewAddAccountEmailHandler(ar account.Repository, cer confirm_email.Repository, carrier CarrierService) AddAccountEmailHandler {
	return AddAccountEmailHandler{ar: ar, cer: cer, carrier: carrier}
}

func (h AddAccountEmailHandler) Handle(ctx context.Context, cmd AddAccountEmail) (*confirm_email.ConfirmEmail, error) {

	// create new confirmation instance
	confirm, secret, err := confirm_email.NewConfirmEmail(cmd.Principal.AccountId(), cmd.Email)

	if err != nil {
		return nil, err
	}

	if err := h.cer.AddConfirmEmail(ctx, confirm); err != nil {
		return nil, err
	}

	// tell carrier to send a notification email
	if err := h.carrier.ConfirmAccountEmail(ctx, cmd.Principal.AccountId(), cmd.Email, confirm.ID(), secret); err != nil {
		return nil, err
	}

	return confirm, nil
}
