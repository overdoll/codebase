package ports

import (
	"context"
	"go.temporal.io/sdk/client"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"
	stella "overdoll/applications/stella/proto"
	"time"
)

type Server struct {
	app    *app.Application
	client client.Client
}

func NewGrpcServer(application *app.Application, client client.Client) *Server {
	return &Server{
		app:    application,
		client: client,
	}
}

func (s Server) GetClubById(ctx context.Context, request *stella.GetClubByIdRequest) (*stella.GetClubByIdResponse, error) {

	clb, err := s.app.Queries.ClubById.Handle(ctx, query.ClubById{
		Id: request.ClubId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.GetClubByIdResponse{
		Club: &stella.Club{
			Slug:           clb.Slug(),
			Name:           clb.Name().TranslateDefault(""),
			OwnerAccountId: clb.OwnerAccountId(),
		},
	}, nil
}

func (s Server) SuspendClub(ctx context.Context, request *stella.SuspendClubRequest) (*emptypb.Empty, error) {

	clubId := request.ClubId
	if err := s.app.Commands.SuspendClubOperator.Handle(ctx, command.SuspendClubOperator{
		ClubId:  clubId,
		EndTime: time.Unix(request.EndTimeUnix, 0),
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) AddClubSupporter(ctx context.Context, request *stella.AddClubSupporterRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.AddClubSupporter.Handle(ctx, command.AddClubSupporter{
		ClubId:      request.ClubId,
		AccountId:   request.AccountId,
		SupportedAt: request.SupportedAt.AsTime(),
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) RemoveClubSupporter(ctx context.Context, request *stella.RemoveClubSupporterRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.RemoveClubSupporter.Handle(ctx, command.RemoveClubSupporter{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
