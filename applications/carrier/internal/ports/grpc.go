package ports

import (
	"context"

	"github.com/golang/protobuf/ptypes/empty"
	"overdoll/applications/carrier/internal/app"
	carrier "overdoll/applications/carrier/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) ConfirmAccountEmail(ctx context.Context, request *carrier.ConfirmAccountEmailRequest) (*empty.Empty, error) {
	if err := s.app.Commands.ConfirmAccountEmail.Handle(ctx, request.Account.Id, request.Email, request.Token); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewLoginToken(ctx context.Context, request *carrier.NewLoginTokenRequest) (*empty.Empty, error) {
	if err := s.app.Commands.NewLoginToken.Handle(ctx, request.Email, request.Token); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}
