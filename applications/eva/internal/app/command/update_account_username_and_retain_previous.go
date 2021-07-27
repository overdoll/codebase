package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type UpdateAccountUsernameAndRetainPrevious struct {
	AccountId string
	Username  string
}

type UpdateAccountUsernameAndRetainPreviousHandler struct {
	ar account.Repository
}

func NewUpdateAccountUsernameAndRetainPreviousHandler(ar account.Repository) UpdateAccountUsernameAndRetainPreviousHandler {
	return UpdateAccountUsernameAndRetainPreviousHandler{ar: ar}
}

func (h UpdateAccountUsernameAndRetainPreviousHandler) Handle(ctx context.Context, cmd UpdateAccountUsernameAndRetainPrevious) (*account.Username, error) {

	_, err := h.ar.GetAccountByUsername(ctx, cmd.Username)

	if err != nil {
		if err == account.ErrAccountNotFound {
			// ensure an account with this username is not existent

			_, user, err := h.ar.UpdateAccountUsername(ctx, cmd.AccountId, func(usr *account.Account) error {
				return usr.EditUsername(cmd.Username)
			})

			if err != nil {
				return nil, err
			}

			return user, nil
		}
	}

	return nil, account.ErrUsernameNotUnique
}
