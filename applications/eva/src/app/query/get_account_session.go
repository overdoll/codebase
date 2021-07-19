package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
)

type GetAccountSessionHandler struct {
	sr session.Repository
}

func NewGetAccountSessionHandler(sr session.Repository) GetAccountSessionHandler {
	return GetAccountSessionHandler{sr: sr}
}

var (
	ErrFailedGetSession = errors.New("failed to get session")
)

func (h GetAccountSessionHandler) Handle(ctx context.Context, sessionId string) (*session.Session, error) {

	sess, err := h.sr.GetSessionById(ctx, sessionId)

	if err != nil {
		zap.S().Errorf("failed to get session: %s", err)
		return nil, ErrFailedGetSession
	}

	return sess, nil
}
