package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type DeleteAccountEmail struct {
	Principal *principal.Principal
	Email     string
}

type DeleteAccountEmailHandler struct {
	ar account.Repository
}

func NewDeleteAccountEmailHandler(ar account.Repository) DeleteAccountEmailHandler {
	return DeleteAccountEmailHandler{ar: ar}
}

func (h DeleteAccountEmailHandler) Handle(ctx context.Context, cmd DeleteAccountEmail) error {
	return h.ar.DeleteAccountEmail(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.Email)
}
