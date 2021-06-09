package ports

import (
	"context"

	"go.temporal.io/sdk/client"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/temporal/workflows"
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

func (s Server) GetPendingPost(ctx context.Context, request *sting.PendingPostRequest) (*sting.PendingPost, error) {
	post, err := s.app.Queries.GetPendingPost.Handle(ctx, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.PendingPost{
		ModeratorId:   post.ModeratorId(),
		ContributorId: post.Contributor().ID(),
	}, nil
}

func (s Server) RejectPendingPost(ctx context.Context, request *sting.PendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.RejectPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func (s Server) PublishPendingPost(ctx context.Context, request *sting.PendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartPublishPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewPublishPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func (s Server) DiscardPendingPost(ctx context.Context, request *sting.PendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartDiscardPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewDiscardPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}

func (s Server) UndoPendingPost(ctx context.Context, request *sting.PendingPostRequest) (*sting.UpdatePendingPostResponse, error) {
	if err := s.app.Commands.StartUndoPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: "sting",
		ID:        "NewUndoPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.UndoPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePendingPostResponse{}, nil
}
