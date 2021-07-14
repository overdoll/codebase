package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/session"
)

type RevokeAccountSessionHandler struct {
	sr session.Repository
}

func NewRevokeAccountSessionHandler(sr session.Repository) RevokeAccountSessionHandler {
	return RevokeAccountSessionHandler{sr: sr}
}

var (
	ErrFailedRevokeAccountSession = errors.New("failed to revoke session")
)

func (h RevokeAccountSessionHandler) Handle(ctx context.Context, accountId, sessionId string) error {

	if err := h.sr.RevokeSessionById(ctx, accountId, sessionId); err != nil {
		zap.S().Errorf("failed to revoke session: %s", err)
		return ErrFailedRevokeAccountSession
	}

	return nil
}
