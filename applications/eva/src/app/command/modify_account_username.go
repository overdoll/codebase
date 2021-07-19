package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type ModifyAccountUsernameHandler struct {
	ar account.Repository
}

func NewModifyAccountUsernameHandler(ar account.Repository) ModifyAccountUsernameHandler {
	return ModifyAccountUsernameHandler{ar: ar}
}

var (
	ErrFailedModifyUsername = errors.New("failed to modify username")
)

const (
	ValidationErrUsernameNotUnique = "username_not_unique"
)

// TODO: need to grab username instance
func (h ModifyAccountUsernameHandler) Handle(ctx context.Context, accountId, username string) (*account.Username, string, error) {

	_, err := h.ar.GetAccountByUsername(ctx, username)

	if err != nil {
		if err == account.ErrAccountNotFound {
			// ensure an account with this username is not existent

			_, user, err := h.ar.UpdateAccountUsername(ctx, accountId, func(usr *account.Account) error {
				return usr.EditUsername(username)
			})

			if err != nil {
				zap.S().Errorf("failed to modify username: %s", err)
				return nil, "", ErrFailedModifyUsername
			}

			return user, "", nil
		}
	}

	return nil, ValidationErrUsernameNotUnique, nil
}
