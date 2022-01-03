package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type UpdateAccountUsername struct {
	// account that is making this request
	// must not be nil
	Principal *principal.Principal
	Username  string
}

type UpdateAccountUsernameHandler struct {
	ar account.Repository
}

func NewUpdateAccountUsernameHandler(ar account.Repository) UpdateAccountUsernameHandler {
	return UpdateAccountUsernameHandler{ar: ar}
}

func (h UpdateAccountUsernameHandler) Handle(ctx context.Context, cmd UpdateAccountUsername) (*account.Account, error) {

	user, err := h.ar.UpdateAccountUsername(ctx, cmd.Principal, cmd.Principal.AccountId(), func(usr *account.Account) error {
		return usr.EditUsername(cmd.Username)
	})

	if err != nil {
		return nil, err
	}

	return user, nil
}
