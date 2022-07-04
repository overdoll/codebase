package ports

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/domain/resource"
	loader "overdoll/applications/loader/proto"
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

func (s Server) CreateOrGetResourcesFromUploads(ctx context.Context, request *loader.CreateOrGetResourcesFromUploadsRequest) (*loader.CreateOrGetResourcesFromUploadsResponse, error) {

	allowVideos := true
	allowImages := true

	if request.ValidationOptions != nil {
		allowVideos = request.ValidationOptions.AllowVideos
		allowImages = request.ValidationOptions.AllowImages
	}

	config, err := resource.NewConfig(request.Config.Width, request.Config.Height)

	if err != nil {
		return nil, err
	}

	resources, err := s.app.Commands.NewCreateOrGetResourcesFromUploads.Handle(ctx, command.CreateOrGetResourcesFromUploads{
		ItemId:      request.ItemId,
		UploadIds:   request.ResourceIds,
		IsPrivate:   request.Private,
		Token:       request.Token,
		Source:      request.Source.String(),
		AllowVideos: allowVideos,
		AllowImages: allowImages,
		Config:      config,
	})

	if err != nil {

		if err == resource.ErrFileTypeNotAllowed {
			return nil, status.Error(codes.InvalidArgument, err.Error())
		}

		return nil, err
	}

	var response []*proto.Resource

	for _, res := range resources {
		response = append(response, resource.ToProto(res))
	}

	return &loader.CreateOrGetResourcesFromUploadsResponse{Resources: response}, nil
}

func (s Server) DeleteResources(ctx context.Context, request *loader.DeleteResourcesRequest) (*loader.DeleteResourcesResponse, error) {

	if err := s.app.Commands.DeleteResources.Handle(ctx, command.DeleteResources{
		ItemId:      request.ItemId,
		ResourceIds: request.ResourceIds,
	}); err != nil {
		return nil, err
	}

	return &loader.DeleteResourcesResponse{}, nil
}

func (s Server) GetResources(ctx context.Context, request *loader.GetResourcesRequest) (*loader.GetResourcesResponse, error) {

	allResources, err := s.app.Queries.ResourcesByIds.Handle(ctx, query.ResourcesByIds{
		ItemIds:     []string{request.ItemId},
		ResourceIds: request.ResourceIds,
	})

	if err != nil {
		return nil, err
	}

	var response []*proto.Resource

	for _, res := range allResources {
		response = append(response, resource.ToProto(res))
	}

	return &loader.GetResourcesResponse{Resources: response}, nil
}

func (s Server) UpdateResourcePrivacy(ctx context.Context, request *loader.UpdateResourcePrivacyRequest) (*loader.UpdateResourcePrivacyResponse, error) {

	data := command.UpdateResourcePrivacy{
		ResourcePairs: []struct {
			ItemId     string
			ResourceId string
		}{},
		IsPrivate: request.Private,
	}

	for _, r := range request.Resources {
		data.ResourcePairs = append(data.ResourcePairs, struct {
			ItemId     string
			ResourceId string
		}{
			ItemId:     r.ItemId,
			ResourceId: r.Id,
		})
	}

	filteredResources, err := s.app.Commands.UpdateResourcePrivacy.Handle(ctx, data)

	if err != nil {
		return nil, err
	}

	var finalResources []*proto.Resource

	for _, r := range filteredResources {
		finalResources = append(finalResources, resource.ToProto(r))
	}

	return &loader.UpdateResourcePrivacyResponse{Resources: finalResources}, nil
}

func (s Server) CopyResourcesAndApplyFilter(ctx context.Context, request *loader.CopyResourcesAndApplyFilterRequest) (*loader.CopyResourcesAndApplyFilterResponse, error) {

	data := command.CopyResourcesAndApplyFilters{
		ResourcePairs: []struct {
			ItemId     string
			ResourceId string
		}{},
		IsPrivate: request.Private,
		Token:     request.Token,
	}

	for _, r := range request.Resources {
		data.ResourcePairs = append(data.ResourcePairs, struct {
			ItemId     string
			ResourceId string
		}{
			ItemId:     r.ItemId,
			ResourceId: r.Id,
		})
	}

	if request.Filters != nil {

		if request.Filters.Pixelate != nil {
			pixelateSize := int(request.Filters.Pixelate.Size)
			filters, err := resource.NewImageFilters(&pixelateSize)

			if err != nil {
				return nil, err
			}

			data.Filters = filters
		}
	}

	if request.Config != nil {
		config, err := resource.NewConfig(request.Config.Width, request.Config.Height)

		if err != nil {
			return nil, err
		}

		data.Config = config
	}

	filteredResources, err := s.app.Commands.CopyResourcesAndApplyFilters.Handle(ctx, data)

	if err != nil {
		return nil, err
	}

	var filtered []*loader.FilteredResources

	for _, r := range filteredResources {
		filtered = append(filtered, &loader.FilteredResources{
			OldResource: &loader.ResourceIdentifier{
				Id:     r.OldResource().ID(),
				ItemId: r.OldResource().ItemId(),
			},
			NewResource: resource.ToProto(r.NewResource()),
		})
	}

	return &loader.CopyResourcesAndApplyFilterResponse{Resources: filtered}, nil
}
