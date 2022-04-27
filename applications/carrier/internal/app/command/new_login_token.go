package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewLoginToken struct {
	Email  string
	Token  string
	Secret string
}

type NewLoginTokenHandler struct {
	mr mailing.Repository
}

func NewNewLoginTokenHandler(mr mailing.Repository) NewLoginTokenHandler {
	return NewLoginTokenHandler{mr: mr}
}

func (h NewLoginTokenHandler) Handle(ctx context.Context, cmd NewLoginToken) error {

	link, err := links.CreateVerifyTokenUrl(cmd.Token, cmd.Secret)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"new_login_token",
		map[string]interface{}{
			"Link": link.String(),
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("", cmd.Email)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
