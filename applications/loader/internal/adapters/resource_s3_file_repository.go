package adapters

import (
	"bytes"
	"context"
	"fmt"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"net/http"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var (
	ResourcesBucket = ""
	UploadsBucket   = ""
)

func init() {
	ResourcesBucket = os.Getenv("RESOURCES_BUCKET")
	UploadsBucket = os.Getenv("UPLOADS_BUCKET")
}

type ResourceS3FileRepository struct {
	session *session.Session
}

func NewResourceS3FileRepository(session *session.Session) ResourceS3FileRepository {
	return ResourceS3FileRepository{session: session}
}

func (r ResourceS3FileRepository) DeleteResources(ctx context.Context, resources []*resource.Resource) error {

	s3Client := s3.New(r.session)

	for _, res := range resources {

		if !res.IsProcessed() {
			continue
		}

		// delete object
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String(ResourcesBucket), Key: aws.String(res.Url())})

		if err != nil {
			return fmt.Errorf("unable to delete file %v", err)
		}
	}
	return nil
}

// GetResources will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r ResourceS3FileRepository) GetResources(ctx context.Context, itemId string, uploads []string) ([]*resource.Resource, error) {

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

		fileType := resp.Metadata["Filetype"]

		newResource, err := resource.NewResource(itemId, uploadId, *fileType)

		if err != nil {
			return nil, err
		}

		resources = append(resources, newResource)
	}

	return resources, nil
}

// UploadProcessedResources - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceS3FileRepository) UploadProcessedResources(ctx context.Context, resources []*resource.Resource) error {
	downloader := s3manager.NewDownloader(r.session)
	s3Client := s3.New(r.session)

	for _, target := range resources {

		// if target is processed, skip for now
		if target.IsProcessed() {
			continue
		}

		fileId := strings.Split(target.ID(), "+")[0]

		file, err := os.Create(fileId)

		if err != nil {
			return fmt.Errorf("failed to create file: %v", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(UploadsBucket),
				Key:    aws.String(fileId),
			},
		)

		if err != nil {
			return fmt.Errorf("failed to download file: %v", err)
		}

		// process resource, by passing a prefix (where the file should be going) and the file that needs to be processed
		targetsToMove, err := target.ProcessResource(file)

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
				Bucket:        aws.String(ResourcesBucket),
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
				Bucket: aws.String(ResourcesBucket),
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

// tusd composer for handling file uploads
func (r ResourceS3FileRepository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.session)

	store := s3store.New(UploadsBucket, s3Client)

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
