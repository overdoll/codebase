package ports

import (
	"context"

	"github.com/spf13/viper"
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

func (s Server) GetPost(ctx context.Context, request *sting.PostRequest) (*sting.Post, error) {

	post, err := s.app.Queries.GetPost.Handle(ctx, request.Id)

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		ModeratorId:   post.ModeratorId(),
		ContributorId: post.Contributor().ID(),
	}, nil
}

func (s Server) RejectPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.RejectPost.Handle(ctx, request.Id); err != nil {
		return nil, err
	}

	return &sting.UpdatePostResponse{}, nil
}

func (s Server) PublishPost(ctx context.Context, request *sting.PostRequest) (*sting.UpdatePostResponse, error) {

	if err := s.app.Commands.StartPublishPost.Handle(ctx, request.Id); err != nil {
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

	if err := s.app.Commands.StartDiscardPost.Handle(ctx, request.Id); err != nil {
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

	if err := s.app.Commands.StartUndoPost.Handle(ctx, request.Id); err != nil {
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
