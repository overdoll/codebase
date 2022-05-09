package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type AssignAccountArtistRole struct {
	Principal       *principal.Principal
	TargetAccountId string
}

type AssignAccountArtistRoleHandler struct {
	ur account.Repository
}

func NewAssignAccountArtistRoleHandler(ur account.Repository) AssignAccountArtistRoleHandler {
	return AssignAccountArtistRoleHandler{ur: ur}
}

func (h AssignAccountArtistRoleHandler) Handle(ctx context.Context, cmd AssignAccountArtistRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.AssignArtistRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
