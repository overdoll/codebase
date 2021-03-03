package server

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
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
	ImageProcessingBucket = "overdoll.processing"
	ImagePublicBucket     = "overdoll.public"
)

// ProcessPost - process our images (diff check, resizing, etc...)
// and then tell Sting that we are finished, so it can put the post in review or call the next message
func (s *Server) ProcessPost(ctx context.Context, msg *pox.PostProcessImageEvent) {

	// TODO: image processing. for now, just relay back the same images

	_, err := s.services.Sting().ProcessPost(ctx, &sting.ProcessPostRequest{
		Id:     msg.PostId,
		Images: msg.Images,
	})

	if err != nil {
		// TODO: handle error
	}
}

// PublishPost - make the images in the post publicly viewable, and then
// tell Sting about the images
func (s *Server) PublishPost(ctx context.Context, msg *pox.PostPublishImageEvent) {

	downloader := s3manager.NewDownloader(s.session)
	s3Client := s3.New(s.session)

	for _, image := range msg.Images {

		file, err := os.Create(image)

		if err != nil {
			fmt.Println("failed to create file", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(ImageProcessingBucket),
				Key:    aws.String(image),
			},
		)

		if err != nil {
			fmt.Println("failed to download file", err)
		}

		// Upload it to our public bucket so anyone can access it
		_, err = s3Client.PutObject(&s3.PutObjectInput{
			Body:   file,
			Bucket: aws.String(ImagePublicBucket),
			Key:    aws.String(image),
		})

		if err != nil {
			fmt.Println("failed to upload file", err)
		}

		_ = file.Close()
	}

	// Tell Sting about our new images
	_, err := s.services.Sting().PublishPost(ctx, &sting.PublishPostRequest{
		Id:     msg.PostId,
		Images: msg.Images,
	})

	if err != nil {
		// TODO: handle error
	}
}
