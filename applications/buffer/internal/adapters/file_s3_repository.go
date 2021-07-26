package adapters

import (
	"context"
	"io"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"overdoll/applications/buffer/internal/domain/file"
)

const (
	ImageProcessingBucket = "overdoll-processing"
	ImageUploadsBucket    = "overdoll-uploads"
)

type FileS3Repository struct {
	session *session.Session
}

func NewFileS3Repository(session *session.Session) FileS3Repository {
	return FileS3Repository{session: session}
}

func (r FileS3Repository) GetFile(ctx context.Context, file *file.File) (io.ReadCloser, error) {

	s3Client := s3.New(r.session)

	object, err := s3Client.GetObject(&s3.GetObjectInput{Bucket: aws.String(ImageProcessingBucket), Key: aws.String(file.GetLocation())})

	if err != nil {
		return nil, err
	}

	return object.Body, nil
}

func (r FileS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.session)

	store := s3store.S3Store{
		Bucket:            ImageUploadsBucket,
		Service:           s3Client,
		MaxPartSize:       5 * 1024 * 1024 * 1024,
		PreferredPartSize: 5 * 1024 * 1024,
		MinPartSize:       0,
		MaxObjectSize:     5 * 1024 * 1024 * 1024 * 1024,
		MaxMultipartParts: 10,
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
