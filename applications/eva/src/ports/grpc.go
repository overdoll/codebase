package ports

import (
	"context"
	"fmt"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/app"
)

type Server struct {
	app app.Application
}

func CreateServer(application app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	usr, err := s.app.Queries.GetUser.Handle(ctx, request.Id)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get user: %s", err))
	}

	return &eva.User{Username: usr.Username(), Id: usr.ID(), Roles: usr.UserRolesAsString(), Verified: usr.Verified(), Avatar: usr.Avatar()}, nil
}
