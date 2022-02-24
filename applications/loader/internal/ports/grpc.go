package ports

import (
	"context"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	loader "overdoll/applications/loader/proto"
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
	})

	if err != nil {
		return nil, err
	}

	var newResourceIds []string

	for _, r := range resources {
		newResourceIds = append(newResourceIds, r.ID())
	}

	return &loader.CreateOrGetResourcesFromUploadsResponse{AllResourceIds: newResourceIds}, nil
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

	allResources, err := s.app.Queries.ResourcesByIdsWithUrls.Handle(ctx, query.ResourcesByIdsWithUrls{
		ItemIds:     []string{request.ItemId},
		ResourceIds: request.ResourceIds,
	})

	if err != nil {
		return nil, err
	}

	var responseResources []*loader.Resource

	for _, resource := range allResources {
		responseResources = append(responseResources, &loader.Resource{
			Id:          resource.ID(),
			ItemId:      resource.ItemId(),
			Processed:   resource.IsProcessed(),
			ProcessedId: resource.ProcessedId(),
			Private:     resource.IsPrivate(),
		})
	}

	return &loader.GetResourcesResponse{Resources: responseResources}, nil
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

	for i, r := range request.Resources {
		data.ResourcePairs[i] = struct {
			ItemId     string
			ResourceId string
		}{
			ItemId:     r.ItemId,
			ResourceId: r.Id,
		}
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
			NewResource: &loader.ResourceIdentifier{
				Id:     r.NewResource().ID(),
				ItemId: r.NewResource().ItemId(),
			},
		})
	}

	return &loader.CopyResourcesAndApplyFilterResponse{Resources: filtered}, nil
}
