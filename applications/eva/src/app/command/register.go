package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
)

type RegisterHandler struct {
	cr cookie.Repository
	ur user.Repository
}

func NewRegisterHandler(cr cookie.Repository, ur user.Repository) RegisterHandler {
	return RegisterHandler{cr: cr, ur: ur}
}

var (
	ErrFailedRegister = errors.New("failed to register")
)

func (h RegisterHandler) Handle(ctx context.Context, cookieId, username string) (bool, error) {
	pass := passport.FromContext(ctx)

	if pass.IsAuthenticated() {
		return false, errors.New("user currently logged in")
	}

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return false, ErrFailedRegister
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err = ck.MakeConsumed(); err != nil {
		return false, err
	}

	instance, err := user.NewUser(uuid.New().String(), username, ck.Email())

	if err != nil {
		return false, err
	}

	err = h.ur.CreateUser(ctx, instance)

	// TODO: handle better - if username is taken, etc...
	if err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return false, ErrFailedRegister
	}

	err = pass.MutatePassport(ctx, func(p *passport.Passport) error {
		p.SetUser(instance.ID())
		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to mutate passport: %s", err)
		return false, ErrFailedRegister
	}

	return true, nil
}
