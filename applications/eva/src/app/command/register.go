package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
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

func (h RegisterHandler) Handle(ctx context.Context, cookieId, username string) (*user.User, error) {

	ck, err := h.cr.GetCookieById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, ErrFailedRegister
	}

	// Cookie should have been redeemed at this point, if we are on this command
	if err = ck.MakeConsumed(); err != nil {
		return nil, err
	}

	instance, err := user.NewUser(uuid.New().String(), username, ck.Email())

	if err != nil {
		return nil, err
	}

	err = h.ur.CreateUser(ctx, instance)

	if err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return nil, ErrFailedRegister
	}

	return instance, nil
}
