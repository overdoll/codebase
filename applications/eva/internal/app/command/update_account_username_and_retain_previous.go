package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type UpdateAccountUsernameAndRetainPrevious struct {
	// account that is making this request
	// must not be nil
	Principal *principal.Principal
	Username  string
}

type UpdateAccountUsernameAndRetainPreviousHandler struct {
	ar account.Repository
}

func NewUpdateAccountUsernameAndRetainPreviousHandler(ar account.Repository) UpdateAccountUsernameAndRetainPreviousHandler {
	return UpdateAccountUsernameAndRetainPreviousHandler{ar: ar}
}

func (h UpdateAccountUsernameAndRetainPreviousHandler) Handle(ctx context.Context, cmd UpdateAccountUsernameAndRetainPrevious) (*account.Username, error) {

	_, user, err := h.ar.UpdateAccountUsername(ctx, cmd.Principal, cmd.Principal.AccountId(), func(usernames []*account.Username, usr *account.Account) error {
		return usr.EditUsername(usernames, cmd.Username)
	})

	if err != nil {
		return nil, err
	}

	return user, nil
}
