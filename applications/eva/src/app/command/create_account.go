package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/uuid"
)

type CreateAccountHandler struct {
	ur account.Repository
}

func NewCreateUserHandler(ur account.Repository) CreateAccountHandler {
	return CreateAccountHandler{ur: ur}
}

var (
	ErrFailedCreateUser = errors.New("failed to create user")
)

func (h CreateAccountHandler) Handle(ctx context.Context, username, email string) (*account.Account, error) {

	instance, err := account.NewAccount(uuid.New().String(), username, email)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return nil, ErrFailedCreateUser
	}

	return instance, nil
}
