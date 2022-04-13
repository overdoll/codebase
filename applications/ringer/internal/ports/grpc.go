package ports

import (
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/ringer/internal/app"
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
	//TODO implement me
	panic("implement me")
}

func (s Server) ClubPaymentDeduction(ctx context.Context, request *ringer.ClubPaymentDeductionRequest) (*emptypb.Empty, error) {
	//TODO implement me
	panic("implement me")
}
