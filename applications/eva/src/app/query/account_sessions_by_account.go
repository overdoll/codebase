package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/paging"
)

type AccountSessionsByAccountHandler struct {
	sr session.Repository
}

func NewAccountSessionsByAccountHandler(sr session.Repository) AccountSessionsByAccountHandler {
	return AccountSessionsByAccountHandler{sr: sr}
}

var (
	ErrFailedAccountSessionsByAccount = errors.New("failed to get sessions for account")
)

func (h AccountSessionsByAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, sessionCookie, id string) ([]*session.Session, *paging.Info, error) {

	ur, page, err := h.sr.GetSessionsByAccountId(ctx, cursor, sessionCookie, id)

	if err != nil {
		zap.S().Errorf("failed to get sessions: %s", err)
		return nil, nil, ErrFailedAccountSessionsByAccount
	}

	return ur, page, nil
}
