package adapters

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"overdoll/applications/sting/internal/domain/resource"
)

const (
	StaticBucket  = "overdoll-assets"
	UploadsBucket = "overdoll-uploads"
)

type ResourceS3Repository struct {
	session *session.Session
}

func NewResourceS3Repository(session *session.Session) ResourceS3Repository {
	return ResourceS3Repository{session: session}
}

// tusd composer for handling file uploads
func (r ResourceS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.session)

	store := s3store.S3Store{
		Bucket:            UploadsBucket,
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

// CreateResources will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r ResourceS3Repository) CreateResources(ctx context.Context, uploads []string) ([]*resource.Resource, error) {

	var resources []*resource.Resource

	s3Client := s3.New(r.session)

	for _, uploadId := range uploads {

		fileId := strings.Split(uploadId, "+")[0]

		resp, err := s3Client.HeadObject(&s3.HeadObjectInput{
			Bucket: aws.String(UploadsBucket),
			Key:    aws.String(fileId),
		})

		if err != nil {
			return nil, fmt.Errorf("failed to head file: %v", err)
		}

		// create a new resource - our url + the content type that came back from S3
		newResource, err := resource.NewResource(fileId, *resp.ContentType)

		if err != nil {
			return nil, err
		}

		resources = append(resources, newResource)
	}

	return resources, nil
}

// ProcessResources - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceS3Repository) ProcessResources(ctx context.Context, prefix string, resources []*resource.Resource) error {
	downloader := s3manager.NewDownloader(r.session)
	s3Client := s3.New(r.session)

	for _, target := range resources {

		// if target is processed, skip for now
		if target.IsProcessed() {
			continue
		}

		file, err := os.Create(target.Url())

		if err != nil {
			return fmt.Errorf("failed to create file: %v", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(UploadsBucket),
				Key:    aws.String(target.Url()),
			},
		)

		if err != nil {
			return fmt.Errorf("failed to download file: %v", err)
		}

		// process resource, by passing a prefix (where the file should be going) and the file that needs to be processed
		targetsToMove, err := target.ProcessResource(prefix, file)

		if err != nil {
			return fmt.Errorf("failed to process resource: %v", err)
		}

		// go through each new file from the filesystem (contained by resource) and upload to s3
		for _, target := range targetsToMove {

			file, err := os.Open(target.OsFileLocation())

			if err != nil {
				return err
			}

			fileInfo, _ := file.Stat()
			var size = fileInfo.Size()
			buffer := make([]byte, size)
			file.Read(buffer)

			// new file that was created
			_, err = s3Client.PutObject(&s3.PutObjectInput{
				Bucket:        aws.String(StaticBucket),
				Key:           aws.String(target.RemoteUrlTarget()),
				Body:          bytes.NewReader(buffer),
				ContentLength: aws.Int64(size),
				ContentType:   aws.String(http.DetectContentType(buffer)),
			})

			if err != nil {
				return fmt.Errorf("failed to put file: %v", err)
			}

			// wait until file is available in private bucket

			if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
				Bucket: aws.String(StaticBucket),
				Key:    aws.String(target.RemoteUrlTarget()),
			}); err != nil {
				return fmt.Errorf("failed to wait for file: %v", err)
			}

			// clean up file at the end to free up resources
			_ = file.Close()
			_ = os.Remove(target.OsFileLocation())
		}
	}

	return nil
}

func (r ResourceS3Repository) DeleteProcessedResources(ctx context.Context, resources []*resource.Resource) error {

	s3Client := s3.New(r.session)

	for _, res := range resources {

		if !res.IsProcessed() {
			continue
		}

		// delete object
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String(StaticBucket), Key: aws.String(res.Url())})

		if err != nil {
			return fmt.Errorf("unable to delete file %v", err)
		}
	}

	return nil
}
