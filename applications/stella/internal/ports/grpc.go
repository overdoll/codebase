package ports

import (
	"context"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/domain/club"
	stella "overdoll/applications/stella/proto"
)

type Server struct {
	app    *app.Application
	client client.Client
}

func NewGrpcServer(application *app.Application, client client.Client) *Server {
	return &Server{
		app:    application,
		client: client,
	}
}

func (s Server) GetClub(ctx context.Context, request *stella.GetClubRequest) (*stella.GetClubResponse, error) {

	_, err := s.app.Queries.ClubById.Handle(ctx, query.ClubById{
		Id: request.Id,
	})

	if err != nil {
		if err == club.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return &stella.GetClubResponse{}, nil
}
