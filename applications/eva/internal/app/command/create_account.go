package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/uuid"
)

type CreateAccount struct {
	Username string
	Email    string
}

type CreateAccountHandler struct {
	ur account.Repository
}

func NewCreateUserHandler(ur account.Repository) CreateAccountHandler {
	return CreateAccountHandler{ur: ur}
}

func (h CreateAccountHandler) Handle(ctx context.Context, cmd CreateAccount) (*account.Account, error) {

	instance, err := account.NewAccount(uuid.New().String(), cmd.Username, cmd.Email)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	return instance, nil
}
