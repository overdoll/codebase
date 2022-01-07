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

func (s Server) CanAccountPostUnderClub(ctx context.Context, request *stella.CanAccountPostUnderClubRequest) (*stella.CanAccountPostUnderClubResponse, error) {

	res, err := s.app.Queries.CanAccountPostUnderClub.Handle(ctx, query.CanAccountPostUnderClub{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	})

	if err != nil {
		if err == club.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return &stella.CanAccountPostUnderClubResponse{Allowed: res}, nil
}
