package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type AssignAccountStaffRole struct {
	Principal *principal.Principal
}

type AssignAccountStaffRoleHandler struct {
	ur account.Repository
}

func NewAssignAccountStaffRoleHandler(ur account.Repository) AssignAccountStaffRoleHandler {
	return AssignAccountStaffRoleHandler{ur: ur}
}

func (h AssignAccountStaffRoleHandler) Handle(ctx context.Context, cmd AssignAccountStaffRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.Principal.AccountId(), func(u *account.Account) error {
		return u.AssignStaffRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
