package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type AccountNewRegistration struct {
	AccountId string
}

type AccountNewRegistrationHandler struct {
	mr  mailing.Repository
	eva EvaService
}

func NewAccountNewRegistrationHandler(mr mailing.Repository, eva EvaService) AccountNewRegistrationHandler {
	return AccountNewRegistrationHandler{mr: mr, eva: eva}
}

func (h AccountNewRegistrationHandler) Handle(ctx context.Context, cmd AccountNewRegistration) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"account_new_registration",
		map[string]interface{}{
			"Username": acc.Username(),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifierWithCustomSource(acc, "Ilya & Nikita <hello@overdoll.com>")

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
