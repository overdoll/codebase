package command

import (
	"context"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/principal"
)

type RevokeAccountSession struct {
	Principal *principal.Principal

	// passport, which contains our current session ID
	Passport *passport.Passport

	SessionId string
}

type RevokeAccountSessionHandler struct {
	sr session.Repository
}

func NewRevokeAccountSessionHandler(sr session.Repository) RevokeAccountSessionHandler {
	return RevokeAccountSessionHandler{sr: sr}
}

func (h RevokeAccountSessionHandler) Handle(ctx context.Context, cmd RevokeAccountSession) error {
	return h.sr.RevokeSessionById(ctx, cmd.Principal, cmd.Passport, cmd.SessionId)
}
