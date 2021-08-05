package adapters

import (
	"context"
	"fmt"
	"net/url"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/h2non/filetype"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"overdoll/libraries/uuid"
)

const (
	ImageStaticBucket  = "overdoll-assets"
	PostContentBucket  = "overdoll-posts"
	ImageUploadsBucket = "overdoll-uploads"
)

const (
	PendingPostPrefix = "pending_posts/"
)

type ContentS3Repository struct {
	session *session.Session
}

func NewContentS3Repository(session *session.Session) ContentS3Repository {
	return ContentS3Repository{session: session}
}

// tusd composer for handling file uploads
func (r ContentS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
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

// ProcessContent - do filetype validation, move files to a user private bucket out of the uploading bucket
func (r ContentS3Repository) ProcessContent(ctx context.Context, accountId string, oldContent []string) ([]string, error) {
	downloader := s3manager.NewDownloader(r.session)
	s3Client := s3.New(r.session)

	var content []string

	for _, image := range oldContent {

		// the actual file ID is before the + since that's how tus handles it
		fileId := strings.Split(image, "+")[0]

		file, err := os.Create(fileId)

		if err != nil {
			return nil, fmt.Errorf("failed to create file: %v", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(ImageUploadsBucket),
				Key:    aws.String(fileId),
			},
		)

		if err != nil {
			return nil, fmt.Errorf("failed to download file: %v", err)
		}

		head := make([]byte, 261)
		_, err = file.Read(head)

		if err != nil {
			return nil, err
		}

		// do a mime type check on the file to make sure its an accepted file and to get our extension
		kind, _ := filetype.Match(head)
		if kind == filetype.Unknown {
			fmt.Println("unknown file type")
			continue
		}

		// Check that our mime type is an accepted one
		if !(kind.MIME.Value == "image/jpeg" || kind.MIME.Value == "image/png" || kind.MIME.Value == "video/mp4") {
			fmt.Println("invalid file mime type", err)
			continue
		}

		fileName := uuid.New().String() + "." + kind.Extension
		fileKey := accountId + "/" + fileName

		// move file to private bucket
		_, err = s3Client.CopyObject(&s3.CopyObjectInput{Bucket: aws.String(ImageStaticBucket),
			CopySource: aws.String(url.PathEscape(ImageUploadsBucket + "/" + fileId)), Key: aws.String(PendingPostPrefix + fileKey)})

		if err != nil {
			return nil, fmt.Errorf("failed to copy file: %v", err)
		}

		// wait until file is available in private bucket
		err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{Bucket: aws.String(ImageStaticBucket), Key: aws.String(PendingPostPrefix + fileKey)})
		if err != nil {
			return nil, fmt.Errorf("failed to wait for file: %v", err)
		}

		// add to our list of files
		content = append(content, fileName)

		_ = file.Close()
		_ = os.Remove(fileId)
		// we dont have to worry about deleting the file from s3 since it will be deleted eventually (expiration)
	}

	return content, nil
}

func (r ContentS3Repository) MakeProcessedContentPublic(ctx context.Context, accountId string, oldContent []string) ([]string, error) {

	s3Client := s3.New(r.session)
	var content []string

	for _, image := range oldContent {

		newFileId := uuid.New().String()

		// move file to private bucket
		_, err := s3Client.CopyObject(&s3.CopyObjectInput{Bucket: aws.String(PostContentBucket),
			CopySource: aws.String(url.PathEscape(ImageStaticBucket + "/" + PendingPostPrefix + accountId + "/" + image)), Key: aws.String(newFileId)})

		if err != nil {
			fmt.Printf("unable to copy file %s", err)
			continue
		}

		// wait until file is available in private bucket
		err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{Bucket: aws.String(PostContentBucket), Key: aws.String(newFileId)})
		if err != nil {
			return nil, fmt.Errorf("error while waitint for item to be copied: %v", err)
		}

		// add to our list of files
		content = append(content, newFileId)
	}

	return content, nil
}

func (r ContentS3Repository) DeletePublicContent(ctx context.Context, content []string) error {

	s3Client := s3.New(r.session)

	for _, image := range content {

		// move file to private bucket
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String(PostContentBucket), Key: aws.String(image)})

		if err != nil {
			fmt.Printf("unable to delete file %s", err)
			continue
		}
	}

	return nil
}

func (r ContentS3Repository) DeleteProcessedContent(ctx context.Context, accountId string, content []string) error {

	s3Client := s3.New(r.session)

	for _, image := range content {

		id := aws.String(PendingPostPrefix + url.PathEscape(accountId+"/"+image))

		// move file to private bucket
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String(ImageStaticBucket), Key: id})

		if err != nil {
			fmt.Printf("unable to delete file %s", err)
			continue
		}
	}

	return nil
}
