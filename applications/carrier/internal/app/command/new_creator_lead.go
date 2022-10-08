package command

import (
	"context"
	"os"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewCreatorLead struct {
	Username  string
	Email     string
	Portfolio string
	Details   string
}

type NewCreatorLeadHandler struct {
	mr mailing.Repository
}

func NewNewCreatorLeadHandler(mr mailing.Repository) NewCreatorLeadHandler {
	return NewCreatorLeadHandler{mr: mr}
}

func (h NewCreatorLeadHandler) Handle(ctx context.Context, cmd NewCreatorLead) error {

	template, err := mailing.NewTemplate(
		"new_creator_lead",
		map[string]interface{}{
			"Username":  cmd.Username,
			"Email":     cmd.Email,
			"Portfolio": cmd.Portfolio,
			"Details":   cmd.Details,
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("overdoll team", os.Getenv("STAFF_ADDRESS"))

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
