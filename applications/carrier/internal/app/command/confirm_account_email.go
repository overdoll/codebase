package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ConfirmAccountEmail struct {
	AccountId    string
	AccountEmail string
	EmailId      string
	EmailSecret  string
}

type ConfirmAccountEmailHandler struct {
	mr  mailing.Repository
	eva EvaService
}

func NewConfirmAccountEmailHandler(mr mailing.Repository, eva EvaService) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{mr: mr, eva: eva}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, cmd ConfirmAccountEmail) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	link, err := links.CreateConfirmEmailUrl(cmd.EmailId, cmd.EmailSecret)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"confirm_account",
		map[string]interface{}{
			"Link": link.String(),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	// custom recipient from
	if err := recipient.SetEmail(cmd.AccountEmail); err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
