package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/principal"
)

type CreateAccountSession struct {
	Principal *principal.Principal

	Passport *passport.Passport

	AccountId string
}

type CreateAccountSessionHandler struct {
	sr session.Repository
	lr location.Repository
}

func NewCreateAccountSessionHandler(sr session.Repository, lr location.Repository) CreateAccountSessionHandler {
	return CreateAccountSessionHandler{sr: sr, lr: lr}
}

func (h CreateAccountSessionHandler) Handle(ctx context.Context, cmd CreateAccountSession) (*session.Session, error) {

	loc, err := h.lr.GetLocationFromIp(ctx, cmd.Passport.IP())

	if err != nil {
		return nil, err
	}

	s, err := session.NewSession(cmd.Principal, cmd.AccountId, cmd.Passport.UserAgent(), cmd.Passport.IP(), loc)

	if err != nil {
		return nil, err
	}

	if err := h.sr.CreateSession(ctx, cmd.Principal, cmd.Passport, s); err != nil {
		return nil, err
	}

	return s, nil
}
