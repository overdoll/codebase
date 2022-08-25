package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type PostFailedProcessing struct {
	PostId string
}

type PostFailedProcessingHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewPostFailedProcessingHandler(mr mailing.Repository, eva EvaService, sting StingService) PostFailedProcessingHandler {
	return PostFailedProcessingHandler{mr: mr, eva: eva, sting: sting}
}

func (h PostFailedProcessingHandler) Handle(ctx context.Context, cmd PostFailedProcessing) error {

	postDetails, err := h.sting.GetPost(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	clubDetails, err := h.sting.GetClub(ctx, postDetails.ClubId())

	if err != nil {
		return err
	}

	acc, err := h.eva.GetAccount(ctx, postDetails.AccountId())

	if err != nil {
		return err
	}

	clubIrl, err := links.CreateEditPostUrl(clubDetails.Slug(), cmd.PostId)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"post_failed_processing",
		map[string]interface{}{
			"Username": acc.Username(),
			"PostLink": clubIrl.String(),
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
