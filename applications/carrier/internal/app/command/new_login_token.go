package command

import (
	"context"
	"net/url"
	"os"
	"path"

	"github.com/matcornic/hermes/v2"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewLoginToken struct {
	Email string
	Token string
}

type NewLoginTokenHandler struct {
	mr mailing.Repository
	ar EvaService
}

func NewNewLoginTokenHandler(mr mailing.Repository) NewLoginTokenHandler {
	return NewLoginTokenHandler{mr: mr}
}

func (h NewLoginTokenHandler) Handle(ctx context.Context, cmd NewLoginToken) error {

	u, err := url.Parse(os.Getenv("APP_URL"))

	if err != nil {
		return err
	}

	u.Path = path.Join(u.Path, "token", cmd.Token)

	email := hermes.Email{
		Body: hermes.Body{
			Name: "Anonymous",
			Intros: []string{
				"Welcome!",
			},
			Actions: []hermes.Action{
				{
					Instructions: "To get started, please click here:",
					Button: hermes.Button{
						Color: "#22BC66", // Optional action button color
						Text:  "Login",
						Link:  u.String(),
					},
				},
			},
		},
	}

	subject := "login"

	template, err := mailing.EmailFromTemplate(subject, email)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("", cmd.Email)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
