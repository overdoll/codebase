package adapters

import (
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/ses"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/errors"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type MailingSESRepository struct {
	client *ses.SES
}

func NewMailingSESRepository(client *ses.SES) MailingSESRepository {
	return MailingSESRepository{client: client}
}

func (r MailingSESRepository) SendEmail(ctx context.Context, recipient *mailing.Recipient, email *mailing.Template) error {

	// empty API key, throw an error
	if os.Getenv("AWS_ACCESS_KEY") == "" {
		return errors.New("please configure SES api keys to send emails")
	}

	sesEmailInput := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{aws.String(recipient.Email())},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Data: aws.String(email.BodyHtml()),
				},
				Text: &ses.Content{
					Data: aws.String(email.BodyText()),
				},
			},
			Subject: &ses.Content{
				Data: aws.String(email.Subject()),
			},
		},
		Source: aws.String(os.Getenv("EMAIL_FROM_ADDRESS")),
	}

	_, err := r.client.SendEmail(sesEmailInput)

	if err != nil {
		zap.S().Errorw("could not send SES email", zap.Error(err))
		return errors.Wrap(err, "could not send SES email")
	}

	return nil
}
