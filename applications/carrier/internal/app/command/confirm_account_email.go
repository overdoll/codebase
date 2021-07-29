package command

import (
	"context"
	"net/url"
	"os"
	"path"

	"github.com/matcornic/hermes/v2"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ConfirmAccountEmail struct {
	AccountId    string
	AccountEmail string
	EmailToken   string
}

type ConfirmAccountEmailHandler struct {
	mr mailing.Repository
	ar EvaService
}

func NewConfirmAccountEmailHandler(mr mailing.Repository, ar EvaService) ConfirmAccountEmailHandler {
	return ConfirmAccountEmailHandler{mr: mr, ar: ar}
}

func (h ConfirmAccountEmailHandler) Handle(ctx context.Context, cmd ConfirmAccountEmail) error {

	acc, err := h.ar.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	u, err := url.Parse(os.Getenv("APP_URL"))

	if err != nil {
		return err
	}

	u.Path = path.Join(u.Path, "confirm-email", cmd.EmailToken)

	email := hermes.Email{
		Body: hermes.Body{
			Name: acc.Username(),
			Intros: []string{
				"Confirm email!",
			},
			Actions: []hermes.Action{
				{
					Instructions: "To confirm your email, click here:",
					Button: hermes.Button{
						Color: "#22BC66", // Optional action button color
						Text:  "Confirm Email",
						Link:  u.String(),
					},
				},
			},
		},
	}

	subject := "confirm email"

	template, err := mailing.EmailFromTemplate(subject, email)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient(acc.Username(), cmd.AccountEmail)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}