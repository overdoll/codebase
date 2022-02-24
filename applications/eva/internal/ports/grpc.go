package ports

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/session"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/passport"
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

		if err == account.ErrAccountNotFound {
			return nil, status.Error(codes.NotFound, err.Error())
		}

		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s Server) GetSession(ctx context.Context, request *eva.SessionRequest) (*eva.SessionResponse, error) {

	ss, err := s.app.Commands.TouchAccountSessionOperator.Handle(ctx, command.TouchAccountSessionOperator{
		SessionId: request.Id,
	})

	if err != nil {

		// not found, return as invalid
		if err == session.ErrSessionsNotFound {
			return &eva.SessionResponse{
				Valid:     false,
				AccountId: "",
			}, nil
		}

		return nil, status.Error(codes.Internal, err.Error())
	}

	return &eva.SessionResponse{
		Valid:     true,
		AccountId: ss.AccountID(),
	}, nil
}

func (s Server) CreateSession(ctx context.Context, request *eva.CreateSessionRequest) (*eva.CreateSessionResponse, error) {

	ss, err := s.app.Commands.CreateAccountSessionOperator.Handle(ctx, command.CreateAccountSessionOperator{
		Passport:  passport.FromContext(ctx),
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &eva.CreateSessionResponse{Id: ss.ID()}, nil
}

func (s Server) RevokeSession(ctx context.Context, request *eva.SessionRequest) (*empty.Empty, error) {

	if err := s.app.Commands.RevokeAccountSessionOperator.Handle(ctx, command.RevokeAccountSessionOperator{
		SessionId: request.Id,
	}); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &empty.Empty{}, nil
}

func (s *Server) GetLocationFromIp(ctx context.Context, request *eva.GetLocationFromIpRequest) (*eva.Location, error) {

	loc, err := s.app.Queries.LocationFromIp.Handle(ctx, query.LocationFromIp{IP: request.Ip})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &eva.Location{
		City:        loc.City(),
		Country:     loc.Country(),
		PostalCode:  loc.PostalCode(),
		Subdivision: loc.Subdivision(),
		Latitude:    loc.Latitude(),
		Longitude:   loc.Longitude(),
	}, nil
}
