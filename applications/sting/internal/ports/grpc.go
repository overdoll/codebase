package ports

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
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
		ClubId: post.ClubId(),
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

func (s Server) AddTerminatedClub(ctx context.Context, request *sting.AddTerminatedClubRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.AddTerminatedClub.Handle(ctx, command.AddTerminatedClub{
		ClubId: request.ClubId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) RemoveTerminatedClub(ctx context.Context, request *sting.RemoveTerminatedClubRequest) (*emptypb.Empty, error) {

	if err := s.app.Commands.RemoveTerminatedClub.Handle(ctx, command.RemoveTerminatedClub{
		ClubId: request.ClubId,
	}); err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s Server) UpdateResources(ctx context.Context, request *proto.UpdateResourcesRequest) (*proto.UpdateResourcesResponse, error) {

	if err := s.app.Commands.UpdateResources.Handle(ctx, command.UpdateResources{Resources: resource.UnmarshalResourcesFromProto(request.Resources)}); err != nil {

		if err == post.ErrResourceNotPresent {
			return nil, status.Error(codes.NotFound, err.Error())
		}

		return nil, err
	}

	return &proto.UpdateResourcesResponse{ShouldRetry: false}, nil
}
