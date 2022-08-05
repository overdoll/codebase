package ports

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
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

func (s Server) GetPrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	p, err := s.app.Queries.PrincipalById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return p, nil
}

func (s Server) GetPost(ctx context.Context, request *sting.PostRequest) (*sting.Post, error) {

	post, err := s.app.Queries.PostByIdOperator.Handle(ctx, query.PostById{
		Id: request.Id,
	})

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		ClubId:    post.ClubId(),
		AccountId: post.ContributorId(),
	}, nil
}

func (s Server) RejectPost(ctx context.Context, request *sting.PostRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.RejectPost.Handle(ctx, command.RejectPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) PublishPost(ctx context.Context, request *sting.PostRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.PublishPost.Handle(ctx, command.PublishPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) DiscardPost(ctx context.Context, request *sting.PostRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.DiscardPost.Handle(ctx, command.DiscardPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) RemovePost(ctx context.Context, request *sting.PostRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.RemovePost.Handle(ctx, command.RemovePost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) DeleteAccountData(ctx context.Context, request *sting.DeleteAccountDataRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.DeleteAccountData.Handle(ctx, command.DeleteAccountData{
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) UpdateResources(ctx context.Context, request *proto.UpdateResourcesRequest) (*proto.UpdateResourcesResponse, error) {

	unmarshalled, err := resource.UnmarshalResourcesFromProto(ctx, request.Resources)

	if err != nil {
		return nil, err
	}

	if err := s.app.Commands.UpdateResources.Handle(ctx, command.UpdateResources{Resources: unmarshalled}); err != nil {

		if err == resource.ErrResourceNotPresent {
			return nil, status.Error(codes.NotFound, err.Error())
		}

		return nil, err
	}

	return &proto.UpdateResourcesResponse{}, nil
}

func (s Server) GetClubById(ctx context.Context, request *sting.GetClubByIdRequest) (*sting.GetClubByIdResponse, error) {

	clb, err := s.app.Queries.ClubById.Handle(ctx, query.ClubById{
		Id: request.ClubId,
	})

	if err != nil {
		return nil, err
	}

	return &sting.GetClubByIdResponse{
		Club: &sting.Club{
			Slug:           clb.Slug(),
			Name:           clb.Name().TranslateDefault(""),
			OwnerAccountId: clb.OwnerAccountId(),
			IsSuspended:    clb.IsSuspended(),
			CanSupport:     clb.CanSupport(),
		},
	}, nil
}

func (s Server) SuspendClub(ctx context.Context, request *sting.SuspendClubRequest) (*emptypb.Empty, error) {

	clubId := request.ClubId
	if err := s.app.Commands.SuspendClubOperator.Handle(ctx, command.SuspendClubOperator{
		ClubId:  clubId,
		EndTime: time.Unix(request.EndTimeUnix, 0),
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) AddClubSupporter(ctx context.Context, request *sting.AddClubSupporterRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.AddClubSupporter.Handle(ctx, command.AddClubSupporter{
		ClubId:      request.ClubId,
		AccountId:   request.AccountId,
		SupportedAt: request.SupportedAt.AsTime(),
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) RemoveClubSupporter(ctx context.Context, request *sting.RemoveClubSupporterRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.RemoveClubSupporter.Handle(ctx, command.RemoveClubSupporter{
		ClubId:    request.ClubId,
		AccountId: request.AccountId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) GetAccountClubDigest(ctx context.Context, request *sting.GetAccountClubDigestRequest) (*sting.GetAccountClubDigestResponse, error) {

	req, err := s.app.Queries.AccountClubDigest.Handle(ctx, query.AccountClubDigest{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &sting.GetAccountClubDigestResponse{
		SupportedClubIds:  req.SupportedClubIds(),
		ClubMembershipIds: req.ClubMembershipIds(),
		OwnerClubIds:      req.OwnerClubIds(),
	}, nil
}

func (s Server) CanDeleteAccountData(ctx context.Context, request *sting.CanDeleteAccountDataRequest) (*sting.CanDeleteAccountDataResponse, error) {

	req, err := s.app.Queries.CanDeleteAccountData.Handle(ctx, query.CanDeleteAccountData{
		AccountId: request.AccountId,
	})

	if err != nil {
		return nil, err
	}

	return &sting.CanDeleteAccountDataResponse{CanDelete: req}, nil
}
