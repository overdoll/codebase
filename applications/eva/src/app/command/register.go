package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/uuid"
)

type RegisterHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewRegisterHandler(cr token.Repository, ur account.Repository) RegisterHandler {
	return RegisterHandler{cr: cr, ur: ur}
}

var (
	ErrFailedRegister = errors.New("failed to register")
)

func (h RegisterHandler) Handle(ctx context.Context, cookieId, username string) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, ErrFailedRegister
	}

	// AuthenticationToken should have been redeemed at this point, if we are on this command
	if err := ck.MakeConsumed(); err != nil {
		return nil, err
	}

	instance, err := account.NewAccount(uuid.New().String(), username, ck.Email())

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return nil, ErrFailedRegister
	}

	if err := h.cr.DeleteAuthenticationTokenById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, ErrFailedRegister
	}

	return instance, nil
}
