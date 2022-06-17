package activities

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"
)

type UnSuspendClubInput struct {
	SuspensionLogId string
	ClubId          string
	AccountId       string
}

func (h *Activities) UnSuspendClub(ctx context.Context, input UnSuspendClubInput) error {

	_, err := h.cr.UpdateClubSuspensionStatus(ctx, input.ClubId, func(club *club2.Club) error {
		return club.UnSuspend()
	})

	if err != nil {
		return err
	}

	newLog, err := club2.NewSuspensionRemovalLog(input.SuspensionLogId, input.ClubId, input.AccountId)

	if err != nil {
		return err
	}

	if err := h.cr.CreateClubSuspensionLog(ctx, newLog); err != nil {
		return err
	}

	return nil
}
