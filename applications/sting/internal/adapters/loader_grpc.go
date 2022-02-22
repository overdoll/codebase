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

func (s LoaderGrpc) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool) ([]string, error) {

	md, err := s.client.CreateOrGetResourcesFromUploads(ctx, &loader.CreateOrGetResourcesFromUploadsRequest{ItemId: itemId, ResourceIds: resourceIds, Private: private})

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

func (s LoaderGrpc) AllResourcesProcessed(ctx context.Context, itemId string, resourceIds []string) (bool, error) {

	res, err := s.client.GetResources(ctx, &loader.GetResourcesRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return false, err
	}

	for _, item := range res.Resources {
		if !item.Processed {
			return false, nil
		}
	}

	return true, nil
}
