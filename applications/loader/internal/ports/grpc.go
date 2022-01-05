package ports

import (
	"context"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/workflows"
	loader "overdoll/applications/loader/proto"
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

func (s Server) CreateOrGetResourcesFromUploads(ctx context.Context, request *loader.CreateOrGetResourcesFromUploadsRequest) (*loader.CreateOrGetResourcesFromUploadsResponse, error) {

	_, err := s.app.Commands.NewCreateOrGetResourcesFromUploads.Handle(ctx, command.CreateOrGetResourcesFromUploads{
		ItemId:    request.ItemId,
		UploadIds: request.ResourceIds,
	})

	if err != nil {
		return nil, err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ProcessResourcesForUpload" + uuid.New().String(),
	}

	_, err = s.client.ExecuteWorkflow(ctx, options, workflows.ProcessResources, request.ItemId, request.ResourceIds)

	if err != nil {
		return nil, err
	}

	return &loader.CreateOrGetResourcesFromUploadsResponse{AllResourceIds: request.ResourceIds}, nil
}

func (s Server) DeleteResources(ctx context.Context, request *loader.DeleteResourcesRequest) (*loader.DeleteResourcesResponse, error) {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "DeleteProcessedResources" + uuid.New().String(),
	}

	_, err := s.client.ExecuteWorkflow(ctx, options, workflows.ProcessResources, request.ItemId, request.ResourceIds)

	if err != nil {
		return nil, err
	}

	return &loader.DeleteResourcesResponse{}, nil
}
