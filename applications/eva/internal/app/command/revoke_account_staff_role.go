package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type RevokeAccountStaffRole struct {
	Principal       *principal.Principal
	TargetAccountId string
}

type RevokeAccountStaffRoleHandler struct {
	ur account.Repository
}

func NewRevokeAccountStaffRoleHandler(ur account.Repository) RevokeAccountStaffRoleHandler {
	return RevokeAccountStaffRoleHandler{ur: ur}
}

func (h RevokeAccountStaffRoleHandler) Handle(ctx context.Context, cmd RevokeAccountStaffRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.RevokeStaffRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
