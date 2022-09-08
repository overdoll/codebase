package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
)

type AssignAccountWorkerRole struct {
	TargetAccountId string
}

type AssignAccountWorkerRoleHandler struct {
	ur account.Repository
}

func NewAssignAccountWorkerRoleHandler(ur account.Repository) AssignAccountWorkerRoleHandler {
	return AssignAccountWorkerRoleHandler{ur: ur}
}

func (h AssignAccountWorkerRoleHandler) Handle(ctx context.Context, cmd AssignAccountWorkerRole) error {

	_, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.AssignWorkerRole()
	})

	if err != nil {
		return err
	}

	return nil
}
