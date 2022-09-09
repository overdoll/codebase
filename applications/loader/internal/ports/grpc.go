package ports

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	resource2 "overdoll/applications/loader/internal/domain/media_processing"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/media/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) ConvertResourceToMedia(ctx context.Context, request *loader.ConvertResourceToMediaRequest) (*loader.ConvertResourceToMediaResponse, error) {
	panic("implement me")
}

func (s Server) ProcessMediaFromUploads(ctx context.Context, request *loader.ProcessMediaFromUploadsRequest) (*loader.ProcessMediaFromUploadsResponse, error) {

	medias, err := s.app.Commands.ProcessMediaFromUploads.Handle(ctx, command.ProcessMediaFromUploads{
		Link:      request.Link,
		UploadIds: request.UploadIds,
		Source:    request.Source.String(),
	})

	if err != nil {

		if err == resource2.ErrFileTypeNotAllowed {
			return nil, status.Error(codes.InvalidArgument, err.Error())
		}

		return nil, err
	}

	var response []*proto.Media

	for _, res := range medias {
		response = append(response, res.Source())
	}

	return &loader.ProcessMediaFromUploadsResponse{Media: response}, nil
}

func (s Server) GenerateImageFromMedia(ctx context.Context, request *loader.GenerateImageFromMediaRequest) (*loader.GenerateImageFromMediaResponse, error) {

	var pixelate *int

	if request.Filters != nil {
		if request.Filters.Pixelate != nil {
			pixelateSize := int(request.Filters.Pixelate.Size)
			pixelate = &pixelateSize
		}
	}

	medias, err := s.app.Commands.GenerateImageFromMedia.Handle(ctx, command.GenerateImageFromMedia{
		SourceMedias: request.Media,
		Link:         request.Link,
		Source:       request.Source.String(),
		Pixelate:     pixelate,
	})

	if err != nil {
		return nil, err
	}

	var response []*proto.Media

	for _, res := range medias {
		response = append(response, res.Source())
	}

	return &loader.GenerateImageFromMediaResponse{Media: response}, nil
}
