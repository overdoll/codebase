package adapters

import (
	"bytes"
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"net/http"
	"os"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
)

type MediaProcessingS3Repository struct {
	aws *session.Session
}

func NewMediaProcessingS3Repository(aws *session.Session) MediaProcessingS3Repository {
	return MediaProcessingS3Repository{aws: aws}
}

func (r MediaProcessingS3Repository) uploadResource(ctx context.Context, moveTarget *media_processing.Move, target *media.Media) error {
	s3Client := s3.New(r.aws)

	remoteUrlTarget := target.Prefix() + "/" + moveTarget.FileName()

	file, err := os.Open(moveTarget.FileName())

	if err != nil {
		return err
	}

	defer file.Close()
	defer os.Remove(moveTarget.FileName())

	fileInfo, _ := file.Stat()
	var size = fileInfo.Size()
	buffer := make([]byte, size)
	file.Read(buffer)

	bucket := os.Getenv("MEDIA_BUCKET")

	input := &s3.PutObjectInput{
		Bucket:        aws.String(bucket),
		Key:           aws.String(remoteUrlTarget),
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(http.DetectContentType(buffer)),
		CacheControl:  aws.String("max-age=604800, must-revalidate"),
	}

	// new file that was created
	_, err = s3Client.PutObject(input)

	if err != nil {
		return errors.Wrap(err, "failed to put file")
	}

	// wait until file is available in private bucket
	if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(remoteUrlTarget),
	}); err != nil {
		return errors.Wrap(err, "failed to wait for file")
	}

	return nil
}

func (r MediaProcessingS3Repository) UploadMedia(ctx context.Context, move []*media_processing.Move, target *media.Media) error {
	// go through each new file from the filesystem (contained by resource) and upload to s3
	for _, moveTarget := range move {
		if err := r.uploadResource(ctx, moveTarget, target); err != nil {
			return err
		}
	}

	return nil
}

func (r MediaProcessingS3Repository) DownloadImageMedia(ctx context.Context, target *media.Media) (*os.File, error) {

	downloader := s3manager.NewDownloader(r.aws)

	file, err := os.Create(target.Id())

	if err != nil {
		return nil, errors.Wrap(err, "failed to create file")
	}

	// Download our file from the private bucket
	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(os.Getenv("MEDIA_BUCKET")),
			Key:    aws.String(target.ImageOriginalKey()),
		},
	)

	if err != nil {
		return nil, errors.Wrap(err, "failed to download file")
	}

	return file, nil
}
