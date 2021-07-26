package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/uuid"
)

var (
	errFailedFailedCreateAccount = errors.New("failed to create account")
)

type CreateAccountWithAuthenticationTokenHandler struct {
	cr token.Repository
	ur account.Repository
}

func NewCreateAccountWithAuthenticationTokenHandler(cr token.Repository, ur account.Repository) CreateAccountWithAuthenticationTokenHandler {
	return CreateAccountWithAuthenticationTokenHandler{cr: cr, ur: ur}
}

func (h CreateAccountWithAuthenticationTokenHandler) Handle(ctx context.Context, cookieId, username string) (*account.Account, error) {

	ck, err := h.cr.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {
		zap.S().Errorf("failed to get cookie: %s", err)
		return nil, errFailedFailedCreateAccount
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
		return nil, errFailedFailedCreateAccount
	}

	if err := h.cr.DeleteAuthenticationTokenById(ctx, cookieId); err != nil {
		zap.S().Errorf("failed to delete cookie: %s", err)
		return nil, errFailedFailedCreateAccount
	}

	return instance, nil
}
