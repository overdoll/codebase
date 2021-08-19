package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type AssignAccountModeratorRole struct {
	Principal *principal.Principal
}

type AssignAccountModeratorRoleHandler struct {
	ur account.Repository
}

func NewAssignAccountModeratorRoleHandler(ur account.Repository) AssignAccountModeratorRoleHandler {
	return AssignAccountModeratorRoleHandler{ur: ur}
}

func (h AssignAccountModeratorRoleHandler) Handle(ctx context.Context, cmd AssignAccountModeratorRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.Principal.AccountId(), func(u *account.Account) error {
		return u.AssignModeratorRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
