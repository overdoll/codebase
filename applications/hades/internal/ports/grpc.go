package ports

import (
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
	hades "overdoll/applications/hades/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) CanDeleteAccountData(ctx context.Context, request *hades.CanDeleteAccountDataRequest) (*hades.CanDeleteAccountDataResponse, error) {

	canDelete, err := s.app.Queries.CanDeleteAccountData.Handle(ctx, query.CanDeleteAccountData{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &hades.CanDeleteAccountDataResponse{
		CanDelete: *canDelete,
	}, nil
}

func (s Server) DeleteAccountData(ctx context.Context, request *hades.DeleteAccountDataRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.DeleteAccountData.Handle(ctx, command.DeleteAccountData{
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
