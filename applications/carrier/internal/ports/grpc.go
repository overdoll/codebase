package ports

import (
	"context"

	"github.com/golang/protobuf/ptypes/empty"
	"overdoll/applications/carrier/internal/app"
	"overdoll/applications/carrier/internal/app/command"
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

	if err := s.app.Commands.ConfirmAccountEmail.Handle(ctx, command.ConfirmAccountEmail{
		AccountId:    request.Account.Id,
		AccountEmail: request.Email,
		EmailToken:   request.Token,
	}); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewLoginToken(ctx context.Context, request *carrier.NewLoginTokenRequest) (*empty.Empty, error) {

	if err := s.app.Commands.NewLoginToken.Handle(ctx, command.NewLoginToken{
		Email: request.Email,
		Token: request.Token,
	}); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}
