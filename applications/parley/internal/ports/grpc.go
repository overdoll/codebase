package ports

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/domain/club_infraction"
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

func (s Server) GetNextModerator(ctx context.Context, request *parley.GetModeratorRequest) (*parley.Moderator, error) {

	moderator, err := s.app.Commands.GetNextModerator.Handle(ctx)

	if err != nil {
		return nil, err
	}

	return &parley.Moderator{Id: moderator.ID()}, nil
}

func (s Server) IsClubSuspended(ctx context.Context, request *parley.IsClubSuspendedRequest) (*parley.IsClubSuspendedResponse, error) {

	_, err := s.app.Queries.ClubSuspensionStatusByClubId.Handle(ctx, query.ClubSuspensionStatusByClubId{
		ClubId: request.ClubId,
	})

	if err != nil {

		if err == club_infraction.ErrClubSuspensionStatusNotFound {
			return &parley.IsClubSuspendedResponse{Suspended: false}, nil
		}

		return nil, err
	}

	return &parley.IsClubSuspendedResponse{Suspended: true}, nil
}
