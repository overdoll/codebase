package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type CreateClub struct {
	Principal *principal.Principal
	Slug      string
	Name      string
}

type CreateClubHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	parley ParleyService
	eva    EvaService
}

func NewCreateClubHandler(pr post.Repository, pi post.IndexRepository) CreateClubHandler {
	return CreateClubHandler{pr: pr, pi: pi}
}

func (h CreateClubHandler) Handle(ctx context.Context, cmd CreateClub) (*post.Club, error) {

	club, err := post.NewClub(cmd.Principal, cmd.Slug, cmd.Name)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateClub(ctx, cmd.Principal, club); err != nil {
		return nil, err
	}

	if err := h.pi.IndexClub(ctx, club); err != nil {
		return nil, err
	}

	return club, nil
}
