package command

import (
	"context"

	"github.com/matcornic/hermes/v2"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ConfirmAccountEmailHandler struct {
	mr mailing.Repository
	ar EvaService
}

func NewConfirmAccountEmailHandler(mr mailing.Repository, ar EvaService) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{mr: mr, ar: ar}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, accountId, accountEmail, emailToken string) error {

	acc, err := h.ar.GetAccount(ctx, accountId)

	if err != nil {
		return err
	}

	email := hermes.Email{
		Body: hermes.Body{
			Name:         "",
			Intros:       nil,
			Dictionary:   nil,
			Table:        hermes.Table{},
			Actions:      nil,
			Outros:       nil,
			Greeting:     "",
			Signature:    "",
			Title:        "",
			FreeMarkdown: "",
		},
	}

	subject := "test"

	template, err := mailing.EmailFromTemplate(subject, email)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient(acc.Username(), accountEmail)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
