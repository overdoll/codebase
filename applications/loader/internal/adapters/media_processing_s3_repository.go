package adapters

import (
	"bytes"
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"io/fs"
	"net/http"
	"os"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/uuid"
	"path/filepath"
)

type MediaProcessingS3Repository struct {
	aws *session.Session
}

func NewMediaProcessingS3Repository(aws *session.Session) MediaProcessingS3Repository {
	return MediaProcessingS3Repository{aws: aws}
}

func (r MediaProcessingS3Repository) uploadResource(ctx context.Context, filePath, remoteUrlTarget string) error {
	s3Client := s3.New(r.aws)

	file, err := os.Open(filePath)

	if err != nil {
		return err
	}

	defer file.Close()
	defer os.Remove(filePath)

	fileInfo, _ := file.Stat()
	var size = fileInfo.Size()
	buffer := make([]byte, size)
	file.Read(buffer)

	input := &s3.PutObjectInput{
		Bucket:        aws.String(os.Getenv("MEDIA_BUCKET")),
		Key:           aws.String(remoteUrlTarget),
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(http.DetectContentType(buffer)),
	}

	// new file that was created
	_, err = s3Client.PutObject(input)

	if err != nil {
		return errors.Wrap(err, "failed to put file")
	}

	return nil
}

func (r MediaProcessingS3Repository) processMove(ctx context.Context, moveTarget *media_processing.Move, target *media.Media) error {

	var remoteUrlTarget string

	if moveTarget.IsImage() {
		remoteUrlTarget = target.ImagePrefix() + "/" + moveTarget.FileName()
	} else {
		remoteUrlTarget = target.VideoPrefix() + "/" + moveTarget.FileName()
	}

	if moveTarget.Directory() != "" {

		defer os.RemoveAll(moveTarget.Directory())

		if err := filepath.Walk(moveTarget.Directory(), func(path string, info fs.FileInfo, err error) error {
			// ignore directories
			if info.IsDir() {
				return nil
			}

			if err := r.uploadResource(ctx, path, remoteUrlTarget+"/"+path); err != nil {
				return err
			}

			return nil
		}); err != nil {
			return err
		}

		return nil
	}

	defer os.Remove(moveTarget.FileName())

	if err := r.uploadResource(ctx, moveTarget.FileName(), remoteUrlTarget); err != nil {
		return err
	}

	return nil
}

func (r MediaProcessingS3Repository) UploadMedia(ctx context.Context, move []*media_processing.Move, target *media.Media) error {
	// go through each new file from the filesystem (contained by resource) and upload to s3
	for _, moveTarget := range move {
		if err := r.processMove(ctx, moveTarget, target); err != nil {
			return err
		}
	}

	return nil
}

func (r MediaProcessingS3Repository) DownloadImageMedia(ctx context.Context, target *media.Media) (*os.File, error) {

	downloader := s3manager.NewDownloader(r.aws)

	file, err := os.Create(uuid.New().String())

	if err != nil {
		return nil, errors.Wrap(err, "failed to create file")
	}

	// Download our file from the private bucket
	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(os.Getenv("MEDIA_BUCKET")),
			Key:    aws.String(target.ImageOriginalDownloadKey()),
		},
	)

	if err != nil {
		return nil, errors.Wrap(err, "failed to download file")
	}

	return file, nil
}
