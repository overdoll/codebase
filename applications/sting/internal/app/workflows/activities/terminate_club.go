package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type TerminateClubInput struct {
	AccountId string
	ClubId    string
}

func (h *Activities) TerminateClub(ctx context.Context, input TerminateClubInput) error {

	_, err := h.cr.UpdateClubTerminationStatus(ctx, input.ClubId, func(club *club.Club) error {
		return club.Terminate(input.AccountId)
	})

	if err != nil {
		return err
	}

	return nil
}
