package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/user"
)

type LockUserHandler struct {
	ur user.Repository
}

func NewLockUserHandler(ur user.Repository) LockUserHandler {
	return LockUserHandler{ur: ur}
}

var (
	ErrFailedLock = errors.New("failed to lock")
)

func (h LockUserHandler) Handle(ctx context.Context, id string, duration int) (*user.User, error) {

	usr, err := h.ur.UpdateUser(ctx, id, func(u *user.User) error {
		u.LockUser(duration)
		return nil
	})

	if err != nil {
		zap.S().Errorf("failed to lock user: %s", err)
		return nil, ErrFailedLock
	}

	return usr, nil
}
