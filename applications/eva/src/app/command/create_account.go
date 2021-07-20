package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/uuid"
)

var (
	ErrFailedCreateAccount = errors.New("failed to create account")
)

type CreateAccountHandler struct {
	ur account.Repository
}

func NewCreateUserHandler(ur account.Repository) CreateAccountHandler {
	return CreateAccountHandler{ur: ur}
}

func (h CreateAccountHandler) Handle(ctx context.Context, username, email string) (*account.Account, error) {

	instance, err := account.NewAccount(uuid.New().String(), username, email)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		zap.S().Errorf("failed to create account: %s", err)
		return nil, ErrFailedCreateAccount
	}

	return instance, nil
}
