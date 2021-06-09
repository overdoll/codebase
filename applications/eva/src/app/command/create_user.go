package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/uuid"
)

type CreateUserHandler struct {
	ur user.Repository
}

func NewCreateUserHandler(ur user.Repository) CreateUserHandler {
	return CreateUserHandler{ur: ur}
}

var (
	ErrFailedCreateUser = errors.New("failed to create user")
)

func (h CreateUserHandler) Handle(ctx context.Context, username, email string) error {

	instance, err := user.NewUser(uuid.New().String(), username, email)

	if err != nil {
		return err
	}

	if err := h.ur.CreateUser(ctx, instance); err != nil {
		zap.S().Errorf("failed to create user: %s", err)
		return ErrFailedCreateUser
	}

	return nil
}
