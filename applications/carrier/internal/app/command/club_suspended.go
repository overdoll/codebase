package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
	"time"
)

type ClubSuspended struct {
	ClubId  string
	EndTime time.Time
}

type ClubSuspendedHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewClubSuspendedHandler(mr mailing.Repository, eva EvaService, sting StingService) ClubSuspendedHandler {
	return ClubSuspendedHandler{mr: mr, eva: eva, sting: sting}
}

func (h ClubSuspendedHandler) Handle(ctx context.Context, cmd ClubSuspended) error {

	clubDetails, err := h.sting.GetClub(ctx, cmd.ClubId)

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

	template, err := mailing.NewTemplate(
		"club_suspended",
		map[string]interface{}{
			"Username": acc.Username(),
			"ClubName": clubDetails.Name(),
			"ClubLink": clubUrl.String(),
			"EndTime":  cmd.EndTime.Format("Mon, 02 Jan 2006 15:04:05 MST"),
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
