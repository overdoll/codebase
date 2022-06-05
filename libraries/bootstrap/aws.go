package bootstrap

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support/zap_adapters"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"go.uber.org/zap"
)

func InitializeAWSSession() *session.Session {
	s, err := session.NewSession(&aws.Config{
		Credentials:      credentials.NewStaticCredentials(os.Getenv("AWS_ACCESS_KEY"), os.Getenv("AWS_ACCESS_SECRET"), ""),
		Endpoint:         aws.String(os.Getenv("AWS_ENDPOINT")),
		Region:           aws.String(os.Getenv("AWS_REGION")),
		DisableSSL:       aws.Bool(false),
		S3ForcePathStyle: aws.Bool(true),
		Logger:           zap_adapters.NewAwsZapAdapter(zap.S()),
	})

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "aws session failed"))
		zap.S().Fatalw("aws session failed", zap.Error(err))
	}

	return s
}
