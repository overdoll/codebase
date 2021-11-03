package query

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountSessionsByAccount struct {
	Principal *principal.Principal

	// passport, which contains our current session ID
	Passport *passport.Passport

	Cursor    *paging.Cursor
	AccountId string
}

type AccountSessionsByAccountHandler struct {
	sr session.Repository
}

func NewAccountSessionsByAccountHandler(sr session.Repository) AccountSessionsByAccountHandler {
	return AccountSessionsByAccountHandler{sr: sr}
}

func (h AccountSessionsByAccountHandler) Handle(ctx context.Context, query AccountSessionsByAccount) ([]*session.Session, error) {

	ur, err := h.sr.GetSessionsByAccountId(ctx, query.Principal, query.Passport, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return ur, nil
}
