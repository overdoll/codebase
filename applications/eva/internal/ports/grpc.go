package ports

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/domain/account"
	eva "overdoll/applications/eva/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func marshalAccountToProto(usr *account.Account) *eva.Account {
	return &eva.Account{
		Username: usr.Username(),
		Id:       usr.ID(),
		Roles:    usr.RolesAsString(),
		Verified: usr.Verified(),
		Email:    usr.Email(),
		Locked:   usr.IsLocked(),
	}
}

func (s *Server) GetAccount(ctx context.Context, request *eva.GetAccountRequest) (*eva.Account, error) {

	acc, err := s.app.Queries.AccountById.Handle(ctx, request.Id)

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s *Server) LockAccount(ctx context.Context, request *eva.LockAccountRequest) (*eva.Account, error) {

	acc, err := s.app.Commands.LockAccount.Handle(ctx, command.LockAccount{
		AccountId: request.Id,
		Duration:  int(request.Duration),
		Reason:    request.Reason.String(),
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s *Server) CreateAccount(ctx context.Context, request *eva.CreateAccountRequest) (*eva.Account, error) {

	acc, err := s.app.Commands.CreateAccount.Handle(ctx, command.CreateAccount{
		Username: request.Username,
		Email:    request.Email,
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}
