package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/confirm_email"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type ConfirmAccountEmail struct {
	// the account that is requesting this action
	Principal *principal.Principal
	Id        string
	Secret    string
}

type ConfirmAccountEmailHandler struct {
	ar  account.Repository
	cer confirm_email.Repository
}

func NewConfirmAccountEmailHandler(ar account.Repository, cer confirm_email.Repository) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{ar: ar, cer: cer}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, cmd ConfirmAccountEmail) (*account.Email, error) {

	// get confirm email instance, make sure it's valid
	confirmEmail, err := h.cer.GetConfirmEmail(ctx, cmd.Principal, cmd.Id)

	if err != nil {
		return nil, err
	}

	// make sure it's in the "confirmed" state
	if err := confirmEmail.ConfirmEmail(cmd.Principal, cmd.Secret); err != nil {
		return nil, err
	}

	emailString, err := confirmEmail.Email()

	if err != nil {
		return nil, err
	}

	email := account.NewConfirmedEmail(emailString, confirmEmail.AccountId())

	// create a new confirmed email
	if err := h.ar.CreateAccountEmail(ctx, cmd.Principal, email); err != nil {
		return nil, err
	}

	// finally, delete the confirmEmail since we no longer need it
	if err := h.cer.DeleteConfirmEmail(ctx, cmd.Principal, confirmEmail); err != nil {
		return nil, err
	}

	return email, nil
}
