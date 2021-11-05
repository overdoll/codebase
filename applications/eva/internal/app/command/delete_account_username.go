package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type DeleteAccountUsername struct {
	Principal *principal.Principal
	Username  string
}

type DeleteAccountUsernameHandler struct {
	ar account.Repository
}

func NewDeleteAccountUsernameHandler(ar account.Repository) DeleteAccountUsernameHandler {
	return DeleteAccountUsernameHandler{ar: ar}
}

func (h DeleteAccountUsernameHandler) Handle(ctx context.Context, cmd DeleteAccountUsername) error {
	return h.ar.DeleteAccountUsername(ctx, cmd.Principal, cmd.Principal.AccountId(), cmd.Username)
}
