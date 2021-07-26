package command

import (
	"context"

	"github.com/matcornic/hermes/v2"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewLoginTokenHandler struct {
	mr mailing.Repository
	ar EvaService
}

func NewNewLoginTokenHandler(mr mailing.Repository) NewLoginTokenHandler {
	return NewLoginTokenHandler{mr: mr}
}

func (h NewLoginTokenHandler) Handle(ctx context.Context, tokenEmail, token string) error {

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

	recipient, err := mailing.NewRecipient("", tokenEmail)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
