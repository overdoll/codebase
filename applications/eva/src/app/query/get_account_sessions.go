package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
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

func (h GetAccountSessionsHandler) Handle(ctx context.Context, sessionCookie, id string) ([]*session.Session, error) {

	ur, err := h.sr.GetSessionsByAccountId(ctx, sessionCookie, id)

	if err != nil {
		zap.S().Errorf("failed to get sessions: %s", err)
		return nil, ErrFailedGetSessions
	}

	return ur, nil
}
