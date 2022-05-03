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
			IsSuspended:    clb.Suspended(),
			CanSupport:     clb.CanSupport(),
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

func (s Server) GetAccountClubDigest(ctx context.Context, request *stella.GetAccountClubDigestRequest) (*stella.GetAccountClubDigestResponse, error) {

	req, err := s.app.Queries.AccountClubDigest.Handle(ctx, query.AccountClubDigest{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.GetAccountClubDigestResponse{
		SupportedClubIds:  req.SupportedClubIds(),
		ClubMembershipIds: req.ClubMembershipIds(),
		OwnerClubIds:      req.OwnerClubIds(),
	}, nil
}

func (s Server) CanDeleteAccountData(ctx context.Context, request *stella.CanDeleteAccountDataRequest) (*stella.CanDeleteAccountDataResponse, error) {

	req, err := s.app.Queries.CanDeleteAccountData.Handle(ctx, query.CanDeleteAccountData{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.CanDeleteAccountDataResponse{CanDelete: req}, nil
}

func (s Server) DeleteAccountData(ctx context.Context, request *stella.DeleteAccountDataRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.DeleteAccountData.Handle(ctx, command.DeleteAccountData{
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) NewSupporterPost(ctx context.Context, request *stella.NewSupporterPostRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.NewSupporterPost.Handle(ctx, command.NewSupporterPost{
		ClubId: request.ClubId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}
