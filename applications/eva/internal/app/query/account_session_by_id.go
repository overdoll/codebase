package query

import (
	"context"

	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/principal"
)

type AccountSessionById struct {
	// The account that is requesting this resource
	Principal *principal.Principal

	SessionId string
}

type AccountSessionByIdHandler struct {
	sr session.Repository
}

func NewAccountSessionByIdHandler(sr session.Repository) AccountSessionByIdHandler {
	return AccountSessionByIdHandler{sr: sr}
}

func (h AccountSessionByIdHandler) Handle(ctx context.Context, query AccountSessionById) (*session.Session, error) {

	sess, err := h.sr.GetSessionById(ctx, query.Principal, query.SessionId)

	if err != nil {
		return nil, err
	}

	return sess, nil
}
