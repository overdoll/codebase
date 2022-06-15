package activities

import (
	"context"
	club2 "overdoll/applications/sting/internal/domain/club"
	"time"
)

type SuspendClubInput struct {
	SuspensionLogId string
	ClubId          string
	AccountId       *string
	EndTime         time.Time
	Reason          string
}

func (h *Activities) SuspendClub(ctx context.Context, input SuspendClubInput) error {

	_, err := h.cr.UpdateClubSuspensionStatus(ctx, input.ClubId, func(club *club2.Club) error {
		return club.Suspend(input.EndTime)
	})

	if err != nil {
		return err
	}

	reason, err := club2.SuspensionReasonFromString(input.Reason)

	if err != nil {
		return err
	}

	newLog, err := club2.NewSuspensionLog(input.SuspensionLogId, input.ClubId, input.AccountId, reason, input.EndTime)

	if err != nil {
		return err
	}

	if err := h.cr.CreateClubSuspensionLog(ctx, newLog); err != nil {
		return err
	}

	return nil
}
