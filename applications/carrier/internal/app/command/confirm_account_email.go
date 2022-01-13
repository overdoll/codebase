package command

import (
	"context"
	"net/url"
	"os"
	"path"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type ConfirmAccountEmail struct {
	AccountId    string
	AccountEmail string
	EmailId      string
	EmailSecret  string
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

	u.Path = path.Join(u.Path, "confirm-email")

	u.RawQuery = "id=" + cmd.EmailId + "&secret=" + cmd.EmailSecret

	link := u.String()

	template, err := mailing.NewTemplate("confirm email", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n     <a \n        href=\""+link+"\"\n        target=\"_blank\" \n     >\n            confirm email\n          </a>\n    </body>\n  </html>\n", link)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	// custom recipient from
	if err := recipient.SetEmail(cmd.AccountEmail); err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
