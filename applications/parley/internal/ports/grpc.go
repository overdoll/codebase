package ports

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/command"
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

func (s Server) PutPostIntoModeratorQueueOrPublish(ctx context.Context, request *parley.PutPostIntoModeratorQueueOrPublishRequest) (*parley.PutPostIntoModeratorQueueOrPublishResponse, error) {

	putIntoQueue, err := s.app.Commands.PutPostIntoModeratorQueueOrPublish.Handle(ctx, command.PutPostIntoModeratorQueueOrPublish{
		PostId: request.PostId,
	})

	if err != nil {
		return nil, err
	}

	return &parley.PutPostIntoModeratorQueueOrPublishResponse{PutIntoReview: putIntoQueue}, nil
}
