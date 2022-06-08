package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
	"strconv"
	"time"
)

type ClubSupporterRequiredPostReminder struct {
	ClubId            string
	ElapsedTimeMillis int64
}

type ClubSupporterRequiredPostReminderHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterRequiredPostReminderHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterRequiredPostReminderHandler {
	return ClubSupporterRequiredPostReminderHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterRequiredPostReminderHandler) Handle(ctx context.Context, cmd ClubSupporterRequiredPostReminder) error {

	clubDetails, err := h.stella.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	acc, err := h.eva.GetAccount(ctx, clubDetails.OwnerAccountId())

	if err != nil {
		return err
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	duration, err := time.ParseDuration(strconv.Itoa(int(cmd.ElapsedTimeMillis)) + "ms")

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_supporter_required_post_reminder",
		map[string]interface{}{
			"Username":    acc.Username(),
			"ClubName":    clubDetails.Name(),
			"ClubLink":    clubUrl.String(),
			"ElapsedDays": strconv.Itoa(int(duration.Hours() / 24)),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
