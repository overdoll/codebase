package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

var (
	errFailedModifyUsername = errors.New("failed to modify username")
)

const (
	validationErrUsernameNotUnique = "username_not_unique"
)

type UpdateAccountUsernameAndRetainPreviousHandler struct {
	ar account.Repository
}

func NewUpdateAccountUsernameAndRetainPreviousHandler(ar account.Repository) UpdateAccountUsernameAndRetainPreviousHandler {
	return UpdateAccountUsernameAndRetainPreviousHandler{ar: ar}
}

func (h UpdateAccountUsernameAndRetainPreviousHandler) Handle(ctx context.Context, accountId, username string) (*account.Username, string, error) {

	_, err := h.ar.GetAccountByUsername(ctx, username)

	if err != nil {
		if err == account.ErrAccountNotFound {
			// ensure an account with this username is not existent

			_, user, err := h.ar.UpdateAccountUsername(ctx, accountId, func(usr *account.Account) error {
				return usr.EditUsername(username)
			})

			if err != nil {
				zap.S().Errorf("failed to modify username: %s", err)
				return nil, "", errFailedModifyUsername
			}

			return user, "", nil
		}
	}

	return nil, validationErrUsernameNotUnique, nil
}
