package query

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/applications/eva/internal/domain/account"
)

type AccountEmailsLimit struct {
	Principal *principal.Principal
	AccountId string
}

type AccountEmailsLimitHandler struct {
	ur account.Repository
}

func NewAccountEmailsLimitHandler(ur account.Repository) AccountEmailsLimitHandler {
	return AccountEmailsLimitHandler{ur: ur}
}

func (h AccountEmailsLimitHandler) Handle(ctx context.Context, query AccountEmailsLimit) (int, error) {
	return account.ViewEmailsLimit(query.Principal, query.AccountId)
}
