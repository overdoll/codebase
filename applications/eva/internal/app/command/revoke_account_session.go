package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/session"
)

var (
	errFailedRevokeAccountSession = errors.New("failed to revoke session")
)

type RevokeAccountSessionHandler struct {
	sr session.Repository
}

func NewRevokeAccountSessionHandler(sr session.Repository) RevokeAccountSessionHandler {
	return RevokeAccountSessionHandler{sr: sr}
}

func (h RevokeAccountSessionHandler) Handle(ctx context.Context, accountId, sessionId string) error {

	if err := h.sr.RevokeSessionById(ctx, accountId, sessionId); err != nil {
		zap.S().Errorf("failed to revoke session: %s", err)
		return errFailedRevokeAccountSession
	}

	return nil
}
