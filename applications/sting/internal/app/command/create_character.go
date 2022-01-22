package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateCharacter struct {
	Principal *principal.Principal
	Slug      string
	Name      string
	SeriesId  string
}

type CreateCharacterHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreateCharacterHandler(pr post.Repository, pi post.IndexRepository) CreateCharacterHandler {
	return CreateCharacterHandler{pr: pr, pi: pi}
}

func (h CreateCharacterHandler) Handle(ctx context.Context, cmd CreateCharacter) (*post.Character, error) {

	series, err := h.pr.GetSingleSeriesById(ctx, cmd.Principal, cmd.SeriesId)

	if err != nil {
		return nil, err
	}

	char, err := post.NewCharacter(cmd.Principal, cmd.Slug, cmd.Name, series)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateCharacter(ctx, cmd.Principal, char); err != nil {
		return nil, err
	}

	if err := h.pi.IndexCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}
