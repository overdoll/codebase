package command

import (
	"context"
	"net/url"
	"os"
	"path"

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

	template, err := mailing.NewTemplate("d-900a6f535312497d837ceee347799859", map[string]interface{}{
		"link": u.String(),
	})

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("", cmd.Email, "")

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
