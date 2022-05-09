package command

import (
	"context"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"

	"overdoll/applications/eva/internal/domain/session"
)

type CreateAccountSessionOperator struct {
	Passport  *passport.Passport
	AccountId string
}

type CreateAccountSessionOperatorHandler struct {
	sr session.Repository
	ar account.Repository
	lr location.Repository
}

func NewCreateAccountSessionOperatorHandler(sr session.Repository, ar account.Repository, lr location.Repository) CreateAccountSessionOperatorHandler {
	return CreateAccountSessionOperatorHandler{sr: sr, lr: lr, ar: ar}
}

func (h CreateAccountSessionOperatorHandler) Handle(ctx context.Context, cmd CreateAccountSessionOperator) (*session.Session, error) {

	loc, err := h.lr.GetLocationFromIp(ctx, cmd.Passport.IP())

	if err != nil {
		return nil, err
	}

	acc, err := h.ar.GetAccountById(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	s, err := session.NewSession(acc, cmd.Passport.UserAgent(), cmd.Passport.IP(), loc)

	if err != nil {
		return nil, err
	}

	if err := h.sr.CreateSessionOperator(ctx, s); err != nil {
		return nil, err
	}

	return s, nil
}
