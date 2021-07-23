package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
)

var (
	errFailedSessionById = errors.New("failed to get session")
)

type AccountSessionByIdHandler struct {
	sr session.Repository
}

func NewAccountSessionByIdHandler(sr session.Repository) AccountSessionByIdHandler {
	return AccountSessionByIdHandler{sr: sr}
}

func (h AccountSessionByIdHandler) Handle(ctx context.Context, sessionId string) (*session.Session, error) {

	sess, err := h.sr.GetSessionById(ctx, sessionId)

	if err != nil {
		zap.S().Errorf("failed to get session: %s", err)
		return nil, errFailedSessionById
	}

	return sess, nil
}
