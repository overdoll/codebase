package ports

import (
	"context"
	"overdoll/libraries/principal"

	"overdoll/applications/parley/internal/app"
	parley "overdoll/applications/parley/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

// this is here so our GRPC server can use it to grab the current principal
func (s Server) GetPrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	p, err := s.app.Queries.PrincipalById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return p, nil
}

func (s Server) GetNextModerator(ctx context.Context, request *parley.GetModeratorRequest) (*parley.Moderator, error) {

	moderator, err := s.app.Commands.GetNextModerator.Handle(ctx)

	if err != nil {
		return nil, err
	}

	return &parley.Moderator{Id: moderator.ID()}, nil
}
