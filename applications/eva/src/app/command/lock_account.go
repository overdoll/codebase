package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type LockAccountHandler struct {
	ur account.Repository
}

func NewLockUserHandler(ur account.Repository) LockAccountHandler {
	return LockAccountHandler{ur: ur}
}

var (
	ErrFailedLock = errors.New("failed to lock")
)

func (h LockAccountHandler) Handle(ctx context.Context, id string, duration int, reason string) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, id, func(u *account.Account) error {
		return u.Lock(duration, reason)
	})

	if err != nil {
		zap.S().Errorf("failed to lock user: %s", err)
		return nil, ErrFailedLock
	}

	return usr, nil
}
