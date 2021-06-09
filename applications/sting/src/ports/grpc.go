package ports

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
)

type Server struct {
	app *app.Application
}

func (s Server) RejectPendingPost(ctx context.Context, request *sting.UpdatePendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.RejectPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) PublishPendingPost(ctx context.Context, request *sting.UpdatePendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartPublishPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func (s Server) DiscardPendingPost(ctx context.Context, request *sting.UpdatePendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartDiscardPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func (s Server) UndoPendingPost(ctx context.Context, request *sting.UpdatePendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartUndoPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}
