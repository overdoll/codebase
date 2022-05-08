package activities

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type UpdateClubNextSupporterPostTimeInput struct {
	ClubId    string
	Timestamp time.Time
}

type UpdateClubNextSupporterPostTimePayload struct {
	FutureTime time.Time
}

func (h *Activities) UpdateClubNextSupporterPostTime(ctx context.Context, input UpdateClubNextSupporterPostTimeInput) (*UpdateClubNextSupporterPostTimePayload, error) {

	clb, err := h.cr.UpdateClubNextSupporterPostTime(ctx, input.ClubId, func(club *club.Club) error {
		return club.UpdateNextSupporterPostTime(input.Timestamp)
	})

	if err != nil {
		return nil, err
	}

	return &UpdateClubNextSupporterPostTimePayload{FutureTime: *clb.NextSupporterPostTime()}, nil
}
