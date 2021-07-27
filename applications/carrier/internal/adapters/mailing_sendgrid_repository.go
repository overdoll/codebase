package adapters

import (
	"context"
	"fmt"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"overdoll/applications/carrier/internal/domain/mailing"
)

// all of our emails are sent from a no-reply address
var from = mail.NewEmail("overdoll", "no-reply@overdoll.com")

type MailingSendgridRepository struct {
	client *sendgrid.Client
}

func NewMailingSendgridRepository(client *sendgrid.Client) MailingSendgridRepository {
	return MailingSendgridRepository{client: client}
}

func (r MailingSendgridRepository) SendEmail(ctx context.Context, recipient *mailing.Recipient, email *mailing.Email) error {

	to := mail.NewEmail(recipient.Username(), recipient.Email())

	message := mail.NewSingleEmail(from, email.Subject(), to, email.PlainText(), email.HTML())

	_, err := r.client.Send(message)

	if err != nil {
		return fmt.Errorf("could not send sendgrid email: %v", err)
	}

	return nil
}
