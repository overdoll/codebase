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
	IsCode bool
}

type NewLoginTokenHandler struct {
	mr mailing.Repository
}

func NewNewLoginTokenHandler(mr mailing.Repository) NewLoginTokenHandler {
	return NewLoginTokenHandler{mr: mr}
}

func (h NewLoginTokenHandler) Handle(ctx context.Context, cmd NewLoginToken) error {

	args := map[string]interface{}{}

	if !cmd.IsCode {

		link, err := links.CreateVerifyTokenUrl(cmd.Token, cmd.Secret)

		if err != nil {
			return err
		}

		args["Link"] = link.String()

	} else {
		args["Code"] = cmd.Secret
	}

	template, err := mailing.NewTemplate(
		"new_login_token",
		args,
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
