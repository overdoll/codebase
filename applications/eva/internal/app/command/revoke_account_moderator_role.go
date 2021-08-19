package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type RevokeAccountModeratorRole struct {
	Principal *principal.Principal
}

type RevokeAccountModeratorRoleHandler struct {
	ur account.Repository
}

func NewRevokeAccountModeratorRoleHandler(ur account.Repository) RevokeAccountModeratorRoleHandler {
	return RevokeAccountModeratorRoleHandler{ur: ur}
}

func (h RevokeAccountModeratorRoleHandler) Handle(ctx context.Context, cmd RevokeAccountModeratorRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.Principal.AccountId(), func(u *account.Account) error {
		return u.RevokeModeratorRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
