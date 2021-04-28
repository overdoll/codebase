package command

import (
	"context"

	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/domain/user"
)

type ValidateSessionHandler struct {
	ur user.Repository
	sr session.Repository
}

func NewValidateSessionHandler(ur user.Repository, sr session.Repository) ValidateSessionHandler {
	return ValidateSessionHandler{ur: ur, sr: sr}
}

func (h ValidateSessionHandler) Handle(ctx context.Context, token string) (*user.User, *session.Session, error) {

	sess, err := session.NewSessionFromToken(token)

	if err != nil {
		return nil, nil, err
	}

	err = h.sr.CheckSession(ctx, sess)

	if err != nil {
		return nil, nil, err
	}

	usr, err := h.ur.GetUserById(ctx, sess.Identifier())

	if err != nil {
		return nil, nil, err
	}

	return usr, sess, nil
}
