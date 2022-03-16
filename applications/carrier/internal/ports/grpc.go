package ports

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/carrier/internal/app"
	"overdoll/applications/carrier/internal/app/command"
	carrier "overdoll/applications/carrier/proto"
	"time"
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

	if err := s.app.Commands.ConfirmAccountEmail.Handle(ctx,
		command.ConfirmAccountEmail{
			AccountId:    request.Account.Id,
			AccountEmail: request.Email,
			EmailId:      request.Id,
			EmailSecret:  request.Secret,
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewLoginToken(ctx context.Context, request *carrier.NewLoginTokenRequest) (*empty.Empty, error) {

	if err := s.app.Commands.NewLoginToken.Handle(ctx,
		command.NewLoginToken{
			Email:  request.Email,
			Token:  request.Token,
			Secret: request.Secret,
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) NewClubSupporterSubscription(ctx context.Context, request *carrier.NewClubSupporterSubscriptionRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.NewClubSupporterSubscription.Handle(ctx,
		command.NewClubSupporterSubscription{
			AccountId:       request.Account.Id,
			ClubId:          request.Club.Id,
			SubscriptionId:  request.Subscription.Id,
			Amount:          request.Payment.Amount,
			Currency:        request.Payment.Currency,
			BillingDate:     request.BillingDate.AsTime(),
			NextBillingDate: request.NextBillingDate.AsTime(),
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) ClubSupporterSubscriptionCancelled(ctx context.Context, request *carrier.ClubSupporterSubscriptionCancelledRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.ClubSupporterSubscriptionCancelled.Handle(ctx,
		command.ClubSupporterSubscriptionCancelled{
			AccountId:      request.Account.Id,
			ClubId:         request.Club.Id,
			SubscriptionId: request.Subscription.Id,
			ExpirationDate: request.ExpirationDate.AsTime(),
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) ClubSupporterSubscriptionRefunded(ctx context.Context, request *carrier.ClubSupporterSubscriptionRefundedRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.ClubSupporterSubscriptionRefunded.Handle(ctx,
		command.ClubSupporterSubscriptionRefunded{
			AccountId:      request.Account.Id,
			ClubId:         request.Club.Id,
			SubscriptionId: request.Subscription.Id,
			TransactionId:  request.Transaction.Id,
			Amount:         request.Refund.Amount,
			Currency:       request.Refund.Currency,
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) ClubSupporterSubscriptionPaymentFailure(ctx context.Context, request *carrier.ClubSupporterSubscriptionPaymentFailureRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.ClubSupporterSubscriptionPaymentFailure.Handle(ctx,
		command.ClubSupporterSubscriptionPaymentFailure{
			AccountId:      request.Account.Id,
			ClubId:         request.Club.Id,
			SubscriptionId: request.Subscription.Id,
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (s Server) UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, request *carrier.UpcomingClubSupporterSubscriptionRenewalsRequest) (*emptypb.Empty, error) {

	var renewals []struct {
		ClubId         string
		SubscriptionId string
		Amount         int64
		Currency       string
		BillingDate    time.Time
	}

	for _, renewal := range request.Renewals {
		renewals = append(renewals, struct {
			ClubId         string
			SubscriptionId string
			Amount         int64
			Currency       string
			BillingDate    time.Time
		}{
			ClubId:         renewal.Club.Id,
			SubscriptionId: renewal.Subscription.Id,
			Amount:         renewal.Payment.Amount,
			Currency:       renewal.Payment.Currency,
			BillingDate:    renewal.BillingDate.AsTime(),
		})
	}

	if err := s.app.Commands.UpcomingClubSupporterSubscriptionRenewals.Handle(ctx,
		command.UpcomingClubSupporterSubscriptionRenewals{
			AccountId: request.Account.Id,
			Renewals:  renewals,
		},
	); err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}
