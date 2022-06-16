package ports

import (
	"context"
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

	resources, err := s.app.Commands.NewCreateOrGetResourcesFromUploads.Handle(ctx, command.CreateOrGetResourcesFromUploads{
		ItemId:    request.ItemId,
		UploadIds: request.ResourceIds,
		IsPrivate: request.Private,
		Token:     request.Token,
	})

	if err != nil {
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

func (s Server) CopyResourcesAndApplyFilter(ctx context.Context, request *loader.CopyResourcesAndApplyFilterRequest) (*loader.CopyResourcesAndApplyFilterResponse, error) {

	data := command.CopyResourcesAndApplyFilters{
		ResourcePairs: []struct {
			ItemId     string
			ResourceId string
		}{},
		Filters:   struct{ Pixelate *struct{ Size int } }{},
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

	if request.Filters.Pixelate != nil {
		data.Filters.Pixelate = &struct{ Size int }{Size: int(request.Filters.Pixelate.Size)}
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
