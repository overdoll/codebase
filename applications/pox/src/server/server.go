package server

import (
	"context"

	"github.com/aws/aws-sdk-go/service/s3"
	pox "overdoll/applications/pox/proto"
	"overdoll/applications/pox/src/services"
)

type Server struct {
	s3 *s3.S3
	services services.Services
}

func CreateServer(s3Client *s3.S3, services services.Services) *Server {
	return &Server{
		s3: s3Client,
		services: services,
	}
}

const (
	ImageProcessingBucket = "overdoll.processing"
	ImagePublicBucket     = "overdoll.public"
)

// ProcessPost - process our images (diff check, etc...)
// and then tell Sting that we are finished, so it can put the post in review or call the next message
func (s *Server) ProcessPost(ctx context.Context, msg *pox.PostProcessImageEvent) {}

// PublishPost - make the images in the post publicly viewable, and then
// tell Sting about the images
func (s *Server) PublishPost(ctx context.Context, msg *pox.PostPublishImageEvent) {}
