package ports

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	sting "overdoll/applications/sting/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) GetPrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	p, err := s.app.Queries.PrincipalById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return p, nil
}

func (s Server) GetPost(ctx context.Context, request *sting.PostRequest) (*sting.Post, error) {

	post, err := s.app.Queries.PostByIdOperator.Handle(ctx, query.PostById{
		Id: request.Id,
	})

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		ClubId: post.ClubId(),
	}, nil
}

func (s Server) RejectPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.RejectPost.Handle(ctx, command.RejectPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) PublishPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.PublishPost.Handle(ctx, command.PublishPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) DiscardPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.DiscardPost.Handle(ctx, command.DiscardPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) RemovePost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.RemovePost.Handle(ctx, command.RemovePost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}
