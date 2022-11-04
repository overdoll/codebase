package command

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type UpdateClubBlurb struct {
	Principal *principal.Principal

	ClubId string
	Blurb  string
}

type UpdateClubBlurbHandler struct {
	cr club2.Repository
}

func NewUpdateClubBlurbHandler(cr club2.Repository) UpdateClubBlurbHandler {
	return UpdateClubBlurbHandler{cr: cr}
}

func (h UpdateClubBlurbHandler) Handle(ctx context.Context, cmd UpdateClubBlurb) (*club2.Club, error) {

	clb, err := h.cr.UpdateClubBlurb(ctx, cmd.ClubId, func(club *club2.Club) error {
		return club.UpdateBlurb(cmd.Principal, cmd.Blurb)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
