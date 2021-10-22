package adapters

import (
	"context"
	"fmt"
	"go.uber.org/zap"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type MailingSendgridRepository struct {
	client *sendgrid.Client
}

func NewMailingSendgridRepository(client *sendgrid.Client) MailingSendgridRepository {
	return MailingSendgridRepository{client: client}
}

func (r MailingSendgridRepository) SendEmail(ctx context.Context, recipient *mailing.Recipient, email *mailing.Template) error {

	// empty API key, just dump the console outputs
	if os.Getenv("SENDGRID_API_KEY") == "" {
		zap.S().Info("api key not configured, dumping output")
		fmt.Println()
	}

	m := mail.NewV3Mail()

	from := mail.NewEmail(os.Getenv("EMAIL_FROM_NAME"), os.Getenv("EMAIL_FROM_ADDRESS"))

	m.SetFrom(from)

	m.SetTemplateID(email.TemplateId())

	tos := []*mail.Email{
		mail.NewEmail(recipient.Username(), recipient.Email()),
	}

	p := mail.NewPersonalization()

	p.AddTos(tos...)

	p.DynamicTemplateData = email.Variables()

	p.SetDynamicTemplateData("language", recipient.Language())

	m.AddPersonalizations(p)

	// TODO: need to capture response and make sure it was successful
	_, err := r.client.Send(m)

	if err != nil {
		return fmt.Errorf("could not send sendgrid email: %v", err)
	}

	return nil
}
