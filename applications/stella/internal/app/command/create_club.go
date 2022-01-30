package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type CreateClub struct {
	Principal *principal.Principal
	Slug      string
	Name      string
}

type CreateClubHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewCreateClubHandler(cr club.Repository, ci club.IndexRepository) CreateClubHandler {
	return CreateClubHandler{cr: cr, ci: ci}
}

func (h CreateClubHandler) Handle(ctx context.Context, cmd CreateClub) (*club.Club, error) {

	// get clubs count for account
	currentCount, err := h.cr.GetAccountClubsCount(ctx, cmd.Principal, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	clb, err := club.NewClub(cmd.Principal, cmd.Slug, cmd.Name, currentCount)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateClub(ctx, clb); err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
