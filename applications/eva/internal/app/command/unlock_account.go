package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type UnlockAccount struct {
	// the account that is making this request
	Principal *principal.Principal
}

type UnlockAccountHandler struct {
	ur account.Repository
}

func NewUnlockUserHandler(ur account.Repository) UnlockAccountHandler {
	return UnlockAccountHandler{ur: ur}
}

func (h UnlockAccountHandler) Handle(ctx context.Context, cmd UnlockAccount) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.Principal.AccountId(), func(u *account.Account) error {
		return u.Unlock()
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
