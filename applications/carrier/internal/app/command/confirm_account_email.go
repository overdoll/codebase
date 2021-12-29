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

	u.Path = path.Join(u.Path, "confirm-email")

	q := u.Query()
	q.Set("id", cmd.EmailToken)

	u.RawQuery = q.Encode()

	template, err := mailing.NewTemplate("d-5c81a4ac00d44a9dba2dd58ebed8bcf6", map[string]interface{}{
		"link": u.String(),
	})

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
