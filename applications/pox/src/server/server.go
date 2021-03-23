package server

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
	"github.com/segmentio/ksuid"
	pox "overdoll/applications/pox/proto"
	"overdoll/applications/pox/src/services"
	sting "overdoll/applications/sting/proto"
)

type Server struct {
	session  *session.Session
	services services.Services
}

func CreateServer(ss *session.Session, services services.Services) *Server {
	return &Server{
		session:  ss,
		services: services,
	}
}

const (
	ImageProcessingBucket = "overdoll-processing"
	ImagePublicBucket     = "overdoll-public"
	ImageUploadsBucket    = "overdoll-uploads"
)

// ProcessPost - process our images (diff check, resizing, etc...)
// and then tell Sting that we are finished, so it can put the post in review or call the next message
func (s *Server) ProcessPost(ctx context.Context, msg *pox.PostProcessContentEvent) {

	downloader := s3manager.NewDownloader(s.session)
	s3Client := s3.New(s.session)

	var content []string

	for _, image := range msg.Content {

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
		fileKey := msg.Prefix + "/" + fileName

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
	
	_, err := s.services.Sting().ProcessPost(context.Background(), &sting.ProcessPostRequest{
		Id:      msg.PostId,
		Content: content,
	})

	if err != nil {
		fmt.Printf("error processing post: %s", err)
	}
}

// PublishPost - make the images in the post publicly viewable, and then
// tell Sting about the images
func (s *Server) PublishPost(ctx context.Context, msg *pox.PostPublishContentEvent) {

	// TODO: move file, and delete private file

	_ = s3manager.NewDownloader(s.session)
	_ = s3.New(s.session)

	// Tell Sting about our new images
	_, err := s.services.Sting().PublishPost(ctx, &sting.PublishPostRequest{
		Id:      msg.PostId,
		Content: msg.Content,
	})

	if err != nil {
		// TODO: handle error
	}
}
