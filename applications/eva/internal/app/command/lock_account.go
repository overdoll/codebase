package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type LockAccount struct {
	AccountId string
	Duration  int
	Reason    string
}

type LockAccountHandler struct {
	ur account.Repository
}

func NewLockUserHandler(ur account.Repository) LockAccountHandler {
	return LockAccountHandler{ur: ur}
}

func (h LockAccountHandler) Handle(ctx context.Context, cmd LockAccount) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.AccountId, func(u *account.Account) error {
		return u.Lock(cmd.Duration, cmd.Reason)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
