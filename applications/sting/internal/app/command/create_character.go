package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/domainerror"

	"overdoll/libraries/principal"
)

type CreateCharacter struct {
	Principal *principal.Principal
	Slug      string
	Name      string
	SeriesId  *string
	ClubId    *string
}

type CreateCharacterHandler struct {
	pr post.Repository
	cr club.Repository
}

func NewCreateCharacterHandler(pr post.Repository, cr club.Repository) CreateCharacterHandler {
	return CreateCharacterHandler{pr: pr, cr: cr}
}

func (h CreateCharacterHandler) Handle(ctx context.Context, cmd CreateCharacter) (*post.Character, error) {

	var clb *club.Club
	var series *post.Series
	var err error

	if cmd.SeriesId != nil {

		series, err = h.pr.GetSingleSeriesById(ctx, *cmd.SeriesId)

		if err != nil {
			return nil, err
		}
	}

	if cmd.ClubId != nil {

		clb, err = h.cr.GetClubById(ctx, *cmd.ClubId)

		if err != nil {
			return nil, err
		}

		charactersCount, err := h.cr.GetClubCharactersCount(ctx, cmd.Principal, *cmd.ClubId)

		if err != nil {
			return nil, err
		}

		if charactersCount > clb.CharactersLimit() {
			return nil, domainerror.NewValidation("club character limit reached")
		}
	}

	char, err := post.NewCharacter(cmd.Principal, cmd.Slug, cmd.Name, series, clb)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateCharacter(ctx, char); err != nil {
		return nil, err
	}

	return char, nil
}
