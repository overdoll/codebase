package command

import (
	"context"

	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/domain/user"
)

type RevokeSessionHandler struct {
	ur user.Repository
	sr session.Repository
}

func NewRevokeSessionHandler(ur user.Repository, sr session.Repository) RevokeSessionHandler {
	return RevokeSessionHandler{ur: ur, sr: sr}
}

func (h RevokeSessionHandler) Handle(ctx context.Context, token string) error {

	sess, err := session.NewSessionFromToken(token)

	if err != nil {
		return err
	}

	err = h.sr.RevokeSession(ctx, sess)

	if err != nil {
		return err
	}

	return nil
}
