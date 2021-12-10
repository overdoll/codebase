package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/session"
)

type TouchAccountSessionOperator struct {
	SessionId string
}

type TouchAccountSessionOperatorHandler struct {
	sr session.Repository
}

func NewTouchAccountSessionOperatorHandler(sr session.Repository) TouchAccountSessionOperatorHandler {
	return TouchAccountSessionOperatorHandler{sr: sr}
}

func (h TouchAccountSessionOperatorHandler) Handle(ctx context.Context, cmd TouchAccountSessionOperator) (*session.Session, error) {
	return h.sr.UpdateSessionOperator(ctx, cmd.SessionId, func(session *session.Session) error {
		return session.Touch()
	})
}
