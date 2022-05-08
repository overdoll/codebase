package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
	"time"
)

type AccountDeletionBegin struct {
	AccountId    string
	DeletionDate time.Time
}

type AccountDeletionBeginHandler struct {
	mr  mailing.Repository
	eva EvaService
}

func NewAccountDeletionBeginHandler(mr mailing.Repository, eva EvaService) AccountDeletionBeginHandler {
	return AccountDeletionBeginHandler{mr: mr, eva: eva}
}

func (h AccountDeletionBeginHandler) Handle(ctx context.Context, cmd AccountDeletionBegin) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	link, err := links.CreateCancelAccountDeletionLink()

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"account_deletion_begin",
		map[string]interface{}{
			"Username":     acc.Username(),
			"SettingsLink": link,
			"DeletionDate": cmd.DeletionDate.Format("January 02"),
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
