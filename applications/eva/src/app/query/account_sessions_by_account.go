package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/paging"
)

var (
	errFailedAccountSessionsByAccount = errors.New("failed to get sessions for account")
)

type AccountSessionsByAccountHandler struct {
	sr session.Repository
}

func NewAccountSessionsByAccountHandler(sr session.Repository) AccountSessionsByAccountHandler {
	return AccountSessionsByAccountHandler{sr: sr}
}

func (h AccountSessionsByAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, sessionCookie, id string) ([]*session.Session, error) {

	ur, err := h.sr.GetSessionsByAccountId(ctx, cursor, sessionCookie, id)

	if err != nil {
		zap.S().Errorf("failed to get sessions: %s", err)
		return nil, errFailedAccountSessionsByAccount
	}

	return ur, nil
}
