package ports

import (
	"context"
	"go.temporal.io/sdk/client"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/domain/club"
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

func (s Server) GetAccountClubMembershipIds(ctx context.Context, request *stella.GetAccountClubMembershipIdsRequest) (*stella.GetAccountClubMembershipIdsResponse, error) {

	res, err := s.app.Queries.AccountClubMembershipsOperator.Handle(ctx, query.AccountClubMembershipsOperator{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	var clubIds []string

	for _, c := range res {
		clubIds = append(clubIds, c.ClubId())
	}

	return &stella.GetAccountClubMembershipIdsResponse{ClubIds: clubIds}, nil
}

func (s Server) GetClubById(ctx context.Context, request *stella.GetClubByIdRequest) (*stella.GetClubByIdResponse, error) {

	_, err := s.app.Queries.ClubById.Handle(ctx, query.ClubById{
		Id: request.ClubId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.GetClubByIdResponse{}, nil
}

func (s Server) SuspendClub(ctx context.Context, request *stella.SuspendClubRequest) (*stella.SuspendClubResponse, error) {

	clubId := request.ClubId
	if err := s.app.Commands.SuspendClubOperator.Handle(ctx, command.SuspendClubOperator{
		ClubId:  clubId,
		EndTime: time.Unix(request.EndTimeUnix, 0),
	}); err != nil {
		return nil, err
	}

	return &stella.SuspendClubResponse{}, nil
}

func (s Server) CanAccountCreatePostUnderClub(ctx context.Context, request *stella.CanAccountCreatePostUnderClubRequest) (*stella.CanAccountCreatePostUnderClubResponse, error) {

	res, err := s.app.Queries.CanAccountCreatePostUnderClub.Handle(ctx, query.CanAccountCreatePostUnderClub{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	})

	if err != nil {
		if err == club.ErrClubNotFound {
			return nil, nil
		}

		return nil, err
	}

	return &stella.CanAccountCreatePostUnderClubResponse{Allowed: res}, nil
}

func (s Server) CanAccountViewPostUnderClub(ctx context.Context, request *stella.CanAccountViewPostUnderClubRequest) (*stella.CanAccountViewPostUnderClubResponse, error) {

	res, err := s.app.Queries.CanAccountViewPostUnderClub.Handle(ctx, query.CanAccountViewPostUnderClub{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.CanAccountViewPostUnderClubResponse{Allowed: res}, nil
}

func (s Server) GetSuspendedClubs(ctx context.Context, request *stella.GetSuspendedClubsRequest) (*stella.GetSuspendedClubsResponse, error) {

	res, err := s.app.Queries.SuspendedClubs.Handle(ctx)

	if err != nil {
		return nil, err
	}

	var clubIds []string

	for _, c := range res {
		clubIds = append(clubIds, c.ID())
	}

	return &stella.GetSuspendedClubsResponse{ClubIds: clubIds}, nil
}

func (s Server) GetAccountSupportedClubs(ctx context.Context, request *stella.GetAccountSupportedClubsRequest) (*stella.GetAccountSupportedClubsResponse, error) {
	return &stella.GetAccountSupportedClubsResponse{ClubIds: []string{}}, nil
}

func (s Server) AddClubSupporter(ctx context.Context, request *stella.AddClubSupporterRequest) (*stella.AddClubSupporterResponse, error) {

	if err := s.app.Commands.AddClubSupporter.Handle(ctx, command.AddClubSupporter{
		ClubId:      request.ClubId,
		AccountId:   request.AccountId,
		SupportedAt: request.SupportedAt.AsTime(),
	}); err != nil {
		return nil, err
	}

	return &stella.AddClubSupporterResponse{}, nil
}

func (s Server) RemoveClubSupporter(ctx context.Context, request *stella.RemoveClubSupporterRequest) (*stella.RemoveClubSupporterResponse, error) {

	if err := s.app.Commands.RemoveClubSupporter.Handle(ctx, command.RemoveClubSupporter{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &stella.RemoveClubSupporterResponse{}, nil
}

func (s Server) CanAccountBecomeClubSupporter(ctx context.Context, request *stella.CanAccountBecomeClubSupporterRequest) (*stella.CanAccountBecomeClubSupporterResponse, error) {

	res, err := s.app.Queries.CanAccountBecomeClubSupporter.Handle(ctx, query.CanAccountBecomeClubSupporter{
		AccountId: request.AccountId,
		ClubId:    request.ClubId,
	})

	if err != nil {
		return nil, err
	}

	return &stella.CanAccountBecomeClubSupporterResponse{Allowed: res}, nil
}
