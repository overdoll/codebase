package command

import (
	"context"

	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
)

type RevokeAccountArtistRole struct {
	Principal       *principal.Principal
	TargetAccountId string
}

type RevokeAccountArtistRoleHandler struct {
	ur account.Repository
}

func NewRevokeAccountArtistRoleHandler(ur account.Repository) RevokeAccountArtistRoleHandler {
	return RevokeAccountArtistRoleHandler{ur: ur}
}

func (h RevokeAccountArtistRoleHandler) Handle(ctx context.Context, cmd RevokeAccountArtistRole) (*account.Account, error) {

	usr, err := h.ur.UpdateAccount(ctx, cmd.TargetAccountId, func(u *account.Account) error {
		return u.RevokeArtistRole(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return usr, nil
}
