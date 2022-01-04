package command

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type CreateClub struct {
	Principal *principal.Principal
	Slug      string
	Name      string
}

type CreateClubHandler struct {
	cr     club.Repository
	ci     club.IndexRepository
	parley command.ParleyService
	eva    command.EvaService
}

func NewCreateClubHandler(cr club.Repository, ci club.IndexRepository) CreateClubHandler {
	return CreateClubHandler{cr: cr, ci: ci}
}

func (h CreateClubHandler) Handle(ctx context.Context, cmd CreateClub) (*club.Club, error) {

	clb, err := club.NewClub(cmd.Principal, cmd.Slug, cmd.Name)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateClub(ctx, cmd.Principal, clb); err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
