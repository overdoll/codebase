package adapters

import (
	"context"
	loader "overdoll/applications/loader/proto"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
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
		return nil, errors.Wrap(err, "failed to create or get resources from uploads")
	}

	return md.AllResourceIds, nil
}

func (s LoaderGrpc) CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error) {

	var toApply []*loader.ResourceIdentifier

	for _, r := range resourceIds {
		toApply = append(toApply, &loader.ResourceIdentifier{
			Id:     r,
			ItemId: itemId,
		})
	}

	md, err := s.client.CopyResourcesAndApplyFilter(ctx, &loader.CopyResourcesAndApplyFilterRequest{
		Resources: toApply,
		Filters:   &loader.Filters{Pixelate: &loader.PixelateFilter{Size: int64(pixelate)}},
		Private:   private,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to copy resources and apply pixelate filter")
	}

	var res []*post.NewContent

	for _, r := range md.Resources {
		res = append(res, post.UnmarshalNewContentFromDatabase(itemId, r.OldResource.Id, r.NewResource.Id))
	}

	return res, nil
}

func (s LoaderGrpc) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {

	_, err := s.client.DeleteResources(ctx, &loader.DeleteResourcesRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return errors.Wrap(err, "failed to delete resources")
	}

	return nil
}

func (s LoaderGrpc) AllResourcesProcessed(ctx context.Context, itemId string, resourceIds []string) (bool, error) {

	res, err := s.client.GetResources(ctx, &loader.GetResourcesRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return false, errors.Wrap(err, "failed to get resources")
	}

	for _, item := range res.Resources {
		if !item.Processed {
			return false, nil
		}
	}

	return true, nil
}
