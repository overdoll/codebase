package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountEmailsByAccount struct {
	// The account that is requesting this resource
	Principal *principal.Principal

	// information related to this resource
	Cursor    *paging.Cursor
	AccountId string
}

type AccountEmailsByAccountHandler struct {
	ar account.Repository
}

func NewGetAccountEmailsHandler(ar account.Repository) AccountEmailsByAccountHandler {
	return AccountEmailsByAccountHandler{ar: ar}
}

func (h AccountEmailsByAccountHandler) Handle(ctx context.Context, query AccountEmailsByAccount) ([]*account.Email, error) {

	emails, err := h.ar.GetAccountEmails(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return emails, nil
}
