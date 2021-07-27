package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type DeleteAccountEmail struct {
	AccountId string
	Email     string
}

type DeleteAccountEmailHandler struct {
	ar account.Repository
}

func NewDeleteAccountEmailHandler(ar account.Repository) DeleteAccountEmailHandler {
	return DeleteAccountEmailHandler{ar: ar}
}

func (h DeleteAccountEmailHandler) Handle(ctx context.Context, cmd DeleteAccountEmail) error {
	return h.ar.DeleteAccountEmail(ctx, cmd.AccountId, cmd.Email)
}
