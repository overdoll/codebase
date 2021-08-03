package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/uuid"
)

type CreateAccountOperator struct {
	Username string
	Email    string
}

type CreateAccountOperatorHandler struct {
	ur account.Repository
}

func NewCreateAccountOperatorHandler(ur account.Repository) CreateAccountOperatorHandler {
	return CreateAccountOperatorHandler{ur: ur}
}

func (h CreateAccountOperatorHandler) Handle(ctx context.Context, cmd CreateAccountOperator) (*account.Account, error) {

	instance, err := account.NewAccount(uuid.New().String(), cmd.Username, cmd.Email)

	if err != nil {
		return nil, err
	}

	if err := h.ur.CreateAccount(ctx, instance); err != nil {
		return nil, err
	}

	return instance, nil
}
