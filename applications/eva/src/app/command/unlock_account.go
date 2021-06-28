package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/account"
)

type UnlockAccountHandler struct {
	ur account.Repository
}

func NewUnlockUserHandler(ur account.Repository) UnlockAccountHandler {
	return UnlockAccountHandler{ur: ur}
}

var (
	ErrFailedUnlock = errors.New("failed to unlock")
)

func (h UnlockAccountHandler) Handle(ctx context.Context, id string) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, id, func(u *account.Account) error {
		return u.Unlock()
	})

	if err != nil {
		zap.S().Errorf("failed to unlock user: %s", err)
		return nil, ErrFailedUnlock
	}

	return usr, nil
}
