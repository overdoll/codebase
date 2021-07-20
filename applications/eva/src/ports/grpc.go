package ports

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/domain/account"
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
		Avatar:   usr.Avatar(),
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
	acc, err := s.app.Commands.LockAccount.Handle(ctx, request.Id, int(request.Duration), request.Reason.String())

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s *Server) CreateAccount(ctx context.Context, request *eva.CreateAccountRequest) (*eva.Account, error) {
	acc, err := s.app.Commands.CreateAccount.Handle(ctx, request.Username, request.Email)

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}
