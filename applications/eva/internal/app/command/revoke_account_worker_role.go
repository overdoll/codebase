package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type RevokeAccountWorkerRole struct {
	TargetAccountId string
}

type RevokeAccountWorkerRoleHandler struct {
	ur account.Repository
}

func NewRevokeAccountWorkerRoleHandler(ur account.Repository) RevokeAccountWorkerRoleHandler {
	return RevokeAccountWorkerRoleHandler{ur: ur}
}

func (h RevokeAccountWorkerRoleHandler) Handle(ctx context.Context, cmd RevokeAccountWorkerRole) error {

	_, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.RevokeWorkerRole()
	})

	if err != nil {
		return err
	}

	return nil
}
