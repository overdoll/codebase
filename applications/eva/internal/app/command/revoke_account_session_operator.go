package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/session"
)

type RevokeAccountSessionOperator struct {
	SessionId string
}

type RevokeAccountSessionOperatorHandler struct {
	sr session.Repository
}

func NewRevokeAccountSessionOperatorHandler(sr session.Repository) RevokeAccountSessionOperatorHandler {
	return RevokeAccountSessionOperatorHandler{sr: sr}
}

func (h RevokeAccountSessionOperatorHandler) Handle(ctx context.Context, cmd RevokeAccountSessionOperator) error {
	return h.sr.RevokeSessionOperator(ctx, cmd.SessionId)
}
