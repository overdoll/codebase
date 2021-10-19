package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type RevokeAccountModeratorRole struct {
	Principal       *principal.Principal
	TargetAccountId string
}

type RevokeAccountModeratorRoleHandler struct {
	ur account.Repository
}

func NewRevokeAccountModeratorRoleHandler(ur account.Repository) RevokeAccountModeratorRoleHandler {
	return RevokeAccountModeratorRoleHandler{ur: ur}
}

func (h RevokeAccountModeratorRoleHandler) Handle(ctx context.Context, cmd RevokeAccountModeratorRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.RevokeModeratorRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
