package adapters

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"io"
	"os"
	"overdoll/applications/loader/internal/domain/upload"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"strings"
)

type UploadS3Repository struct {
	aws *session.Session
}

func NewUploadS3Repository(aws *session.Session) UploadS3Repository {
	return UploadS3Repository{aws: aws}
}

func (r UploadS3Repository) GetUpload(ctx context.Context, uploadId string) (*upload.Upload, error) {

	s3Client := s3.New(r.aws)

	fileId := strings.Split(uploadId, "+")[0]

	resp, err := s3Client.HeadObject(&s3.HeadObjectInput{
		Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
		Key:    aws.String(fileId),
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to head file")
	}

	getResp, err := s3Client.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
		Key:    aws.String(fileId + ".info"),
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to get object")
	}

	b, err := io.ReadAll(getResp.Body)

	if err != nil {
		return nil, errors.Wrap(err, "failed to read body")
	}

	type UploadMetaData struct {
		Size     int
		Filename string `json:"filename"`
	}

	var data *UploadMetaData

	if err := json.Unmarshal(b, &data); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal upload metadata")
	}

	if err != nil {
		return nil, errors.Wrap(err, "failed to parse content length")
	}

	if int64(data.Size) != *resp.ContentLength {
		return nil, domainerror.NewValidation("file not yet fully uploaded")
	}

	upl, err := upload.NewUpload(fileId, data.Filename)

	if err != nil {
		return nil, err
	}

	return upl, nil
}

func (r UploadS3Repository) DownloadUpload(ctx context.Context, med *media.Media) (*os.File, error) {
	downloader := s3manager.NewDownloader(r.aws)

	file, err := os.Create(med.ID())

	if err != nil {
		return nil, errors.Wrap(err, "failed to create file")
	}

	// Download our file from the private bucket
	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
			Key:    aws.String(med.ID()),
		},
	)

	if err != nil {
		return nil, errors.Wrap(err, "failed to download file")
	}

	return file, nil
}

func (r UploadS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.aws)

	store := &s3store.S3Store{
		Bucket:             os.Getenv("UPLOADS_BUCKET"),
		Service:            s3Client,
		MaxPartSize:        5 * 1024 * 1024 * 1024,
		MinPartSize:        5 * 1024 * 1024,
		PreferredPartSize:  50 * 1024 * 1024,
		MaxMultipartParts:  10000,
		MaxObjectSize:      5 * 1024 * 1024 * 1024 * 1024,
		MaxBufferedParts:   20,
		TemporaryDirectory: "",
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
