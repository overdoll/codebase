package adapters

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/ses"
	"go.uber.org/zap"
	"os"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type MailingSESRepository struct {
	client *ses.SES
}

func NewMailingSESRepository(client *ses.SES) MailingSESRepository {
	return MailingSESRepository{client: client}
}

func (r MailingSESRepository) SendEmail(ctx context.Context, recipient *mailing.Recipient, email *mailing.Template) error {

	// empty API key, just dump the console outputs
	if os.Getenv("AWS_ACCESS_KEY") == "" {
		zap.S().Info("SES api keys not configured, dumping output: ", zap.String("text", email.BodyText()))
		return nil
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
		return fmt.Errorf("could not send SES email: %v", err)
	}

	return nil
}
