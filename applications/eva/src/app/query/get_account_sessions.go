package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/paging"
)

type GetAccountSessionsHandler struct {
	sr session.Repository
}

func NewGetAccountSessionsHandler(sr session.Repository) GetAccountSessionsHandler {
	return GetAccountSessionsHandler{sr: sr}
}

var (
	ErrFailedGetSessions = errors.New("failed to get emails")
)

func (h GetAccountSessionsHandler) Handle(ctx context.Context, cursor *paging.Cursor, sessionCookie, id string) ([]*session.Session, *paging.Info, error) {

	ur, page, err := h.sr.GetSessionsByAccountId(ctx, cursor, sessionCookie, id)

	if err != nil {
		zap.S().Errorf("failed to get sessions: %s", err)
		return nil, nil, ErrFailedGetSessions
	}

	return ur, page, nil
}
