package ports

import (
	"context"

	parley "overdoll/applications/parley/proto"
	"overdoll/applications/parley/src/app"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) GetNextModerator(ctx context.Context, request *parley.GetModeratorRequest) (*parley.Moderator, error) {
	panic("implement me")
}
