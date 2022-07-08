package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ModeratorPostInQueue struct {
	AccountId string
}

type ModeratorPostInQueueHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewModeratorPostInQueueHandler(mr mailing.Repository, eva EvaService) ModeratorPostInQueueHandler {
	return ModeratorPostInQueueHandler{mr: mr, eva: eva}
}

func (h ModeratorPostInQueueHandler) Handle(ctx context.Context, cmd ModeratorPostInQueue) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	postQueueLink, err := links.CreateModeratorQueueLink()

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"moderator_post_in_queue",
		map[string]interface{}{
			"Username":           acc.Username(),
			"ModeratorQueueLink": postQueueLink,
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
