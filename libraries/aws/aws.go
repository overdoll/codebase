package storage

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
)

func CreateAWSSession() (*session.Session, error) {
	s, err := session.NewSession(&aws.Config{
		Credentials:      credentials.NewStaticCredentials(os.Getenv("AWS_ACCESS_KEY"), os.Getenv("AWS_ACCESS_SECRET"), ""),
		Endpoint:         aws.String(os.Getenv("AWS_ENDPOINT")),
		Region:           aws.String(os.Getenv("AWS_REGION")),
		DisableSSL:       aws.Bool(false),
		S3ForcePathStyle: aws.Bool(true),

	})

	if err != nil {
		return nil, err
	}

	return s, nil
}
