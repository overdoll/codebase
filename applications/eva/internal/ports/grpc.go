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
	"overdoll/libraries/principal"
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

// this is here so our GRPC server can use it to grab the current principal
func (s Server) GetPrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	p, err := s.app.Queries.AccountById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return account.ToPrincipal(p), nil
}

func (s *Server) GetAccount(ctx context.Context, request *eva.GetAccountRequest) (*eva.Account, error) {

	acc, err := s.app.Queries.AccountById.Handle(ctx, request.Id)

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s *Server) LockAccount(ctx context.Context, request *eva.LockAccountRequest) (*eva.Account, error) {

	acc, err := s.app.Commands.LockAccountOperator.Handle(ctx, command.LockAccount{
		AccountId: request.Id,
		Duration:  int(request.Duration),
		Reason:    request.Reason.String(),
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return marshalAccountToProto(acc), nil
}

func (s *Server) GetSession(ctx context.Context, request *eva.GetSessionRequest) (*eva.Session, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	ss, err := s.app.Queries.AccountSessionById.Handle(ctx, query.AccountSessionById{
		Principal: principal.FromContext(ctx),
		Passport:  passport.FromContext(ctx),
		SessionId: request.Id,
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &eva.Session{
		Id:         ss.ID(),
		Serialized: session.Serialize(ss),
	}, nil
}

func (s *Server) DeleteSession(ctx context.Context, request *eva.DeleteSessionRequest) (*empty.Empty, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	if err := s.app.Commands.RevokeAccountSession.Handle(ctx, command.RevokeAccountSession{
		Principal: principal.FromContext(ctx),
		Passport:  passport.FromContext(ctx),
		SessionId: request.Id,
	}); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &empty.Empty{}, nil
}

func (s *Server) SaveSession(ctx context.Context, request *eva.SaveSessionRequest) (*eva.Session, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	ss, err := s.app.Commands.SaveAccountSession.Handle(ctx, command.SaveAccountSession{
		Principal:   principal.FromContext(ctx),
		Passport:    passport.FromContext(ctx),
		SessionId:   request.Session.Id,
		SessionData: request.Session.Serialized,
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &eva.Session{
		Id:         ss.ID(),
		Serialized: session.Serialize(ss),
	}, nil
}
