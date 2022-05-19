package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type AddClubMemberToListInput struct {
	ClubId    string
	AccountId string
	JoinedAt  time.Time
}

func (h *Activities) AddClubMemberToList(ctx context.Context, input AddClubMemberToListInput) error {

	member := club.UnmarshalMemberFromDatabase(
		input.AccountId,
		input.ClubId,
		input.JoinedAt,
		false,
		nil,
	)

	if err := h.cr.CreateClubMember(ctx, member); err != nil {
		return err
	}

	return nil
}
