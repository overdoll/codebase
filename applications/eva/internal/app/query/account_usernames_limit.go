package query

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountUsernamesLimit struct {
	Principal *principal.Principal
	AccountId string
}

type AccountUsernamesLimitHandler struct {
	ur account.Repository
}

func NewAccountUsernamesLimitHandler(ur account.Repository) AccountUsernamesLimitHandler {
	return AccountUsernamesLimitHandler{ur: ur}
}

func (h AccountUsernamesLimitHandler) Handle(ctx context.Context, query AccountUsernamesLimit) (int, error) {
	return account.ViewUsernamesLimit(query.Principal, query.AccountId)
}
