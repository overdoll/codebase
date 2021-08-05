package ports

import (
	"context"

	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows"
	sting "overdoll/applications/sting/proto"
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

func (s Server) GetPost(ctx context.Context, request *sting.PostRequest) (*sting.Post, error) {

	post, err := s.app.Queries.PostById.Handle(ctx, query.PostById{
		PostId: request.Id,
	})

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		ModeratorId:   post.ModeratorId(),
		ContributorId: post.ContributorId(),
	}, nil
}

func (s Server) RejectPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.RejectPost.Handle(ctx, command.RejectPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) PublishPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.PublishPost.Handle(ctx, command.StartPublishPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewPublishPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.PublishPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) DiscardPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.DiscardPost.Handle(ctx, command.StartDiscardPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewDiscardPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.DiscardPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) UndoPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.UndoPost.Handle(ctx, command.StartUndoPost{
		PostId: request.Id,
	}); err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "NewUndoPostWorkflow_" + request.Id,
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.UndoPost, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}
