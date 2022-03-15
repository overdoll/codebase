package ports

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/protobuf/types/known/emptypb"
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
		EmailId:      request.Id,
		EmailSecret:  request.Secret,
	}); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewLoginToken(ctx context.Context, request *carrier.NewLoginTokenRequest) (*empty.Empty, error) {

	if err := s.app.Commands.NewLoginToken.Handle(ctx, command.NewLoginToken{
		Email:  request.Email,
		Token:  request.Token,
		Secret: request.Secret,
	}); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewClubSupporterSubscription(ctx context.Context, request *carrier.NewClubSupporterSubscriptionRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}

func (s Server) ClubSupporterSubscriptionCancelled(ctx context.Context, request *carrier.ClubSupporterSubscriptionCancelledRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}

func (s Server) ClubSupporterSubscriptionRefunded(ctx context.Context, request *carrier.ClubSupporterSubscriptionRefundedRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}

func (s Server) ClubSupporterSubscriptionVoided(ctx context.Context, request *carrier.ClubSupporterSubscriptionVoidedRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}

func (s Server) ClubSupporterSubscriptionPaymentFailure(ctx context.Context, request *carrier.ClubSupporterSubscriptionPaymentFailureRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}

func (s Server) UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, request *carrier.UpcomingClubSupporterSubscriptionRenewalsRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}
