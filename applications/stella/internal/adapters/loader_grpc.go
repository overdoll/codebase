package adapters

import (
	"context"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/errors"
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
		return nil, errors.Wrap(err, "loader - failed to get or create resources from uploads")
	}

	return md.AllResourceIds, nil
}
