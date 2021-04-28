package command

import (
	"context"

	"overdoll/applications/eva/src/domain/session"
	"overdoll/applications/eva/src/domain/user"
)

type CreateSessionHandler struct {
	ur user.Repository
	sr session.Repository
}

func NewCreateSessionHandler(ur user.Repository, sr session.Repository) CreateSessionHandler {
	return CreateSessionHandler{ur: ur, sr: sr}
}

func (h CreateSessionHandler) Handle(ctx context.Context, userId string) (*session.Session, error) {

	usr, err := h.ur.GetUserById(ctx, userId)

	if err != nil {
		return nil, err
	}

	sess, err := session.NewSession(usr)

	if err != nil {
		return nil, err
	}

	// Creat session - put it into redis
	err = h.sr.CreateSession(ctx, sess)

	if err != nil {
		return nil, err
	}

	return sess, nil
}
