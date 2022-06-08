package command

import (
	"context"
	"os"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterNoPosts struct {
	ClubId string
}

type ClubSupporterNoPostsHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterNoPostsHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterNoPostsHandler {
	return ClubSupporterNoPostsHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterNoPostsHandler) Handle(ctx context.Context, cmd ClubSupporterNoPosts) error {

	clubDetails, err := h.stella.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_supporter_no_posts",
		map[string]interface{}{
			"ClubName": clubDetails.Name(),
			"ClubLink": clubUrl.String(),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("overdoll", os.Getenv("STAFF_ADDRESS"))

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
