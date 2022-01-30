package command

import (
	"context"
	"overdoll/libraries/principal"
	"time"

	"overdoll/applications/eva/internal/domain/account"
)

type LockAccount struct {
	Principal *principal.Principal
	AccountId string
	EndTime   time.Time
}

type LockAccountHandler struct {
	ur account.Repository
}

func NewLockAccountHandler(ur account.Repository) LockAccountHandler {
	return LockAccountHandler{ur: ur}
}

func (h LockAccountHandler) Handle(ctx context.Context, cmd LockAccount) (*account.Account, error) {

	acc, err := h.ur.UpdateAccount(ctx, cmd.AccountId, func(u *account.Account) error {
		return u.Lock(cmd.Principal, cmd.EndTime)
	})

	if err != nil {
		return nil, err
	}

	return acc, nil
}
