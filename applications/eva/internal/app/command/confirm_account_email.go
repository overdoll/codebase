package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type ConfirmAccountEmail struct {
	// the account that is requesting this action
	Principal *principal.Principal
	Id        string
}

type ConfirmAccountEmailHandler struct {
	ar account.Repository
}

func NewConfirmAccountEmailHandler(ar account.Repository) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{ar: ar}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, cmd ConfirmAccountEmail) (*account.Email, error) {

	email, err := h.ar.ConfirmAccountEmail(ctx, cmd.Principal, cmd.Id)

	if err != nil {
		return nil, err
	}

	return email, nil
}
