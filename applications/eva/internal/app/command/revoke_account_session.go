package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/session"
)

type RevokeAccountSession struct {
	AccountId string
	SessionId string
}

type RevokeAccountSessionHandler struct {
	sr session.Repository
}

func NewRevokeAccountSessionHandler(sr session.Repository) RevokeAccountSessionHandler {
	return RevokeAccountSessionHandler{sr: sr}
}

func (h RevokeAccountSessionHandler) Handle(ctx context.Context, cmd RevokeAccountSession) error {
	return h.sr.RevokeSessionById(ctx, cmd.AccountId, cmd.SessionId)
}
