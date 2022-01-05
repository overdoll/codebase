package adapters

import (
	"context"
	loader "overdoll/applications/loader/proto"
)

type LoaderGrpc struct {
	client loader.LoaderClient
}

func NewLoaderGrpc(client loader.LoaderClient) LoaderGrpc {
	return LoaderGrpc{client: client}
}

func (s LoaderGrpc) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string) ([]string, error) {

	md, err := s.client.CreateOrGetResourcesFromUploads(ctx, &loader.CreateOrGetResourcesFromUploadsRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return nil, err
	}

	return md.AllResourceIds, nil
}

func (s LoaderGrpc) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {

	_, err := s.client.DeleteResources(ctx, &loader.DeleteResourcesRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return err
	}

	return nil
}
