package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type AccountDeleted struct {
	Username string
	Email    string
}

type AccountDeletedHandler struct {
	mr mailing.Repository
}

func NewAccountDeletedHandler(mr mailing.Repository) AccountDeletedHandler {
	return AccountDeletedHandler{mr: mr}
}

func (h AccountDeletedHandler) Handle(ctx context.Context, cmd AccountDeleted) error {

	template, err := mailing.NewTemplate(
		"account_deleted",
		map[string]interface{}{
			"Username": cmd.Username,
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient(cmd.Username, cmd.Email)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
