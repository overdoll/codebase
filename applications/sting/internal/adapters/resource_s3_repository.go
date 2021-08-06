package adapters

import (
	"bytes"
	"context"
	"fmt"
	"image/png"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/chai2010/webp"
	"github.com/h2non/filetype"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/uuid"
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
func (r ResourceS3Repository) CreateResources(ctx context.Context, uploads []string) ([]*resource.Resource, error) {
	var resources []*resource.Resource

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

		var mimeTypes []string

		// the actual file ID is before the + since that's how tus handles it
		fileId := strings.Split(target.Url(), "+")[0]

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

		head := make([]byte, 261)
		_, err = file.Read(head)

		if err != nil {
			return err
		}

		// do a mime type check on the file to make sure its an accepted file and to get our extension
		kind, _ := filetype.Match(head)
		if kind == filetype.Unknown {
			return fmt.Errorf("uknown file type: %s", kind)
		}

		// this is the file we need to move from our OS to our main bucket (we created an extra file - webp for image, webm for video)
		var fileToMove string
		var fileToMoveExtension string

		if kind.MIME.Value == "image/png" {
			// image is in an accepted format - convert to webp

			var buf bytes.Buffer

			src, err := png.Decode(file)

			if err != nil {
				return fmt.Errorf("failed to decode png %v", err)
			}

			// encode webp
			if err = webp.Encode(&buf, src, &webp.Options{Lossless: true}); err != nil {
				return fmt.Errorf("failed to encode webp %v", err)
			}

			fileToMove = fileId + ".webp"
			fileToMoveExtension = ".webp"

			// put on local OS system to be uploaded to S3
			if err = ioutil.WriteFile(fileToMove, buf.Bytes(), 0666); err != nil {
				return fmt.Errorf("failed to write output webp %v", err)
			}

			// our resource will contain 2 mimetypes - a PNG and a webp
			mimeTypes = append(mimeTypes, "image/webp")
			mimeTypes = append(mimeTypes, "image/png")

			if err := target.MakeImage(); err != nil {
				return err
			}

		} else if kind.MIME.Value == "video/mp4" {
			// video is in an accepted format - convert to webm

			// our resource will contain 2 mimetypes - a webm and an mp4 as a fallback
			mimeTypes = append(mimeTypes, "video/webm")
			mimeTypes = append(mimeTypes, "video/mp4")

			if err := target.MakeVideo(); err != nil {
				return err
			}

		} else {
			return fmt.Errorf("invalid resource format: %s", kind.MIME.Value)
		}

		// original file that was uploaded, with extension
		fileName := uuid.New().String()
		fileKey := prefix + "/" + fileName

		fileUploaded := fileKey + "." + kind.Extension

		// move file to private bucket
		_, err = s3Client.CopyObject(&s3.CopyObjectInput{Bucket: aws.String(StaticBucket),
			CopySource: aws.String(url.PathEscape(UploadsBucket + "/" + fileId)), Key: aws.String(fileUploaded)})

		if err != nil {
			return fmt.Errorf("failed to copy file: %v", err)
		}

		// wait until file is available in private bucket
		err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{Bucket: aws.String(StaticBucket), Key: aws.String(fileUploaded)})
		if err != nil {
			return fmt.Errorf("failed to wait for file: %v", err)
		}

		fileCreated := fileKey + "." + fileToMoveExtension

		file2, err := os.Open(fileToMove)

		if err != nil {
			return err
		}

		// Get file size and read the file content into a buffer
		fileInfo, _ := file2.Stat()
		var size = fileInfo.Size()
		buffer := make([]byte, size)
		file2.Read(buffer)

		// new file that was created
		_, err = s3Client.PutObject(&s3.PutObjectInput{
			Bucket:        aws.String(StaticBucket),
			Key:           aws.String(fileCreated),
			ACL:           aws.String("private"),
			Body:          bytes.NewReader(buffer),
			ContentLength: aws.Int64(size),
			ContentType:   aws.String(http.DetectContentType(buffer)),
		})

		if err != nil {
			return fmt.Errorf("failed to put file: %v", err)
		}

		// wait until file is available in private bucket
		err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{Bucket: aws.String(StaticBucket), Key: aws.String(fileCreated)})
		if err != nil {
			return fmt.Errorf("failed to wait for file: %v", err)
		}

		_ = file2.Close()
		_ = file.Close()
		_ = os.Remove(fileId)
		_ = os.Remove(fileToMove)

		// update resource with new mimetypes
		if err := target.ProcessResource(fileKey, mimeTypes); err != nil {
			return err
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
