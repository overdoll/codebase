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

type LockAccountOperatorHandler struct {
	ur account.Repository
}

func NewLockAccountOperatorHandler(ur account.Repository) LockAccountOperatorHandler {
	return LockAccountOperatorHandler{ur: ur}
}

func (h LockAccountOperatorHandler) Handle(ctx context.Context, cmd LockAccount) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.AccountId, func(u *account.Account) error {
		return u.Lock(cmd.Duration, cmd.Reason)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
