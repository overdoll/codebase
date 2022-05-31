package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
	"time"
)

type AccountDeletionReminder struct {
	AccountId    string
	DeletionDate time.Time
}

type AccountDeletionReminderHandler struct {
	mr  mailing.Repository
	eva EvaService
}

func NewAccountDeletionReminderHandler(mr mailing.Repository, eva EvaService) AccountDeletionReminderHandler {
	return AccountDeletionReminderHandler{mr: mr, eva: eva}
}

func (h AccountDeletionReminderHandler) Handle(ctx context.Context, cmd AccountDeletionReminder) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	link, err := links.CreateCancelAccountDeletionLink()

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"account_deletion_reminder",
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
