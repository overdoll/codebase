package command

import (
	"context"

	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/domain/user"
)

type LogoutHandler struct {
	ur user.Repository
	sr session.Repository
}

func NewLogoutHandler(ur user.Repository, sr session.Repository) LogoutHandler {
	return LogoutHandler{ur: ur, sr: sr}
}

func (h LogoutHandler) Handle(ctx context.Context) (bool, error) {

	sess, err := session.NewSessionFromToken(token)

	if err != nil {
		return false, err
	}

	err = h.sr.RevokeSession(ctx, sess)

	if err != nil {
		return false, err
	}

	return true, nil
}
