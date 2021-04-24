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
	"overdoll/libraries/ksuid"
)

const (
	ImageProcessingBucket = "overdoll-processing"
	ImagePublicBucket     = "overdoll-public"
	ImageUploadsBucket    = "overdoll-uploads"
)

type ContentS3Repository struct {
	session *session.Session
}

func NewContentS3Repository(session *session.Session) ContentS3Repository {
	return ContentS3Repository{session: session}
}

// ProcessContent - do filetype validation, move files to a user private bucket out of the uploading bucket
func (r ContentS3Repository) ProcessContent(ctx context.Context, userId string, oldContent []string) ([]string, error) {
	downloader := s3manager.NewDownloader(r.session)
	s3Client := s3.New(r.session)

	var content []string

	for _, image := range oldContent {

		// the actual file ID is before the + since that's how tus handles it
		fileId := strings.Split(image, "+")[0]

		file, err := os.Create(fileId)

		if err != nil {
			fmt.Println("failed to create file", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(ImageUploadsBucket),
				Key:    aws.String(fileId),
			},
		)

		if err != nil {
			fmt.Println("failed to download file", err)
			continue
		}

		head := make([]byte, 261)
		_, err = file.Read(head)

		if err != nil {
			fmt.Printf("could not read file header %s", err)
			continue
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

		fileName := ksuid.New().String() + "." + kind.Extension
		fileKey := userId + "/" + fileName

		// move file to private bucket
		_, err = s3Client.CopyObject(&s3.CopyObjectInput{Bucket: aws.String(ImageProcessingBucket),
			CopySource: aws.String(url.PathEscape(ImageUploadsBucket + "/" + fileId)), Key: aws.String(fileKey)})

		if err != nil {
			fmt.Printf("unable to copy file %s", err)
			continue
		}

		// wait until file is available in private bucket
		err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{Bucket: aws.String(ImageProcessingBucket), Key: aws.String(fileKey)})
		if err != nil {
			fmt.Printf("error while waiting for item to be copied %s", err)
		}

		// add to our list of files
		content = append(content, fileName)

		_ = file.Close()
		_ = os.Remove(fileId)
		// we dont have to worry about deleting the file from s3 since it will be deleted eventually (expiration)
	}

	return content, nil
}

func (r ContentS3Repository) PublishContent(ctx context.Context, userId string, content []string) ([]string, error) {

	_ = s3manager.NewDownloader(r.session)
	_ = s3.New(r.session)

	// TODO: move files, and delete private file
	return content, nil
}
