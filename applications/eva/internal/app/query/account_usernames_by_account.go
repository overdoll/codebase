package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountUsernamesByAccount struct {
	// the account that is making this request
	Principal *principal.Principal

	Cursor    *paging.Cursor
	AccountId string
}

type AccountUsernamesByAccountHandler struct {
	ar account.Repository
}

func NewAccountUsernamesByAccountHandler(ar account.Repository) AccountUsernamesByAccountHandler {
	return AccountUsernamesByAccountHandler{ar: ar}
}

func (h AccountUsernamesByAccountHandler) Handle(ctx context.Context, query AccountUsernamesByAccount) ([]*account.Username, error) {

	usernames, err := h.ar.GetAccountUsernames(ctx, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return usernames, nil
}
