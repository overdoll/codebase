package ports

import (
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/command"
	ringer "overdoll/applications/ringer/proto"
)

type Server struct {
	app *app.Application
}

func NewGrpcServer(application *app.Application) *Server {
	return &Server{
		app: application,
	}
}

func (s Server) ClubPaymentDeposit(ctx context.Context, request *ringer.ClubPaymentDepositRequest) (*emptypb.Empty, error) {

	isClubSupporterSubscription := false

	if request.Source == ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION {
		isClubSupporterSubscription = true
	}

	if err := s.app.Commands.ClubPaymentDeposit.Handle(ctx, command.ClubPaymentDeposit{
		IdempotencyKey:              request.IdempotencyKey,
		AccountId:                   request.SourceAccountId,
		ClubId:                      request.DestinationClubId,
		AccountTransactionId:        request.AccountTransactionId,
		Amount:                      request.Payment.Amount,
		Currency:                    request.Payment.Currency,
		Timestamp:                   request.Timestamp.AsTime(),
		IsClubSupporterSubscription: isClubSupporterSubscription,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) ClubPaymentDeduction(ctx context.Context, request *ringer.ClubPaymentDeductionRequest) (*emptypb.Empty, error) {

	isClubSupporterSubscription := false

	if request.Source == ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION {
		isClubSupporterSubscription = true
	}

	if err := s.app.Commands.ClubPaymentDeduction.Handle(ctx, command.ClubPaymentDeduction{
		IdempotencyKey:              request.IdempotencyKey,
		AccountId:                   request.SourceAccountId,
		ClubId:                      request.DestinationClubId,
		AccountTransactionId:        request.AccountTransactionId,
		Amount:                      request.Payment.Amount,
		Currency:                    request.Payment.Currency,
		Timestamp:                   request.Timestamp.AsTime(),
		IsClubSupporterSubscription: isClubSupporterSubscription,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) DeleteAccountData(ctx context.Context, request *ringer.DeleteAccountDataRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.DeleteAccountData.Handle(ctx, command.DeleteAccountData{
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
