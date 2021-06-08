package ports

import (
	"context"
	"fmt"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/domain/user"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func marshalUserToProto(usr *user.User) *eva.User {
	return &eva.User{
		Username: usr.Username(),
		Id:       usr.ID(),
		Roles:    usr.UserRolesAsString(),
		Verified: usr.Verified(),
		Avatar:   usr.Avatar(),
		Locked:   usr.IsLocked(),
	}
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	usr, err := s.app.Queries.GetUser.Handle(ctx, request.Id)

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to get user: %s", err))
	}

	return marshalUserToProto(usr), nil
}

func (s *Server) LockUser(ctx context.Context, request *eva.LockUserRequest) (*eva.User, error) {
	usr, err := s.app.Commands.LockUser.Handle(ctx, request.Id, int(request.Duration))

	if err != nil {
		return nil, status.Error(codes.Internal, fmt.Sprintf("failed to lock user: %s", err))
	}

	return marshalUserToProto(usr), nil
}
