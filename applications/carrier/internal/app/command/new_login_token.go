package command

import (
	"context"
	"net/url"
	"os"
	"path"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewLoginToken struct {
	Email  string
	Token  string
	Secret string
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

	u.Path = path.Join(u.Path, "verify-token")

	u.RawQuery = "token=" + cmd.Token + "&secret=" + cmd.Secret

	link := u.String()

	template, err := mailing.NewTemplate("verify token", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n     <a \n        href=\""+link+"\"\n        target=\"_blank\" \n     >\n            authenticate\n          </a>\n    </body>\n  </html>\n", link)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("", cmd.Email, "")

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
