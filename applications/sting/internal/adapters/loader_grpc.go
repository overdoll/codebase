package adapters

import (
	"context"
	loader "overdoll/applications/loader/proto"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
)

type LoaderGrpc struct {
	client     loader.LoaderClient
	serializer *resource.Serializer
}

func NewLoaderGrpc(client loader.LoaderClient, serializer *resource.Serializer) LoaderGrpc {
	return LoaderGrpc{client: client, serializer: serializer}
}

func (s LoaderGrpc) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool, token string) ([]*resource.Resource, error) {

	md, err := s.client.CreateOrGetResourcesFromUploads(ctx, &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId: itemId, ResourceIds: resourceIds, Private: private, Token: token, Source: proto.SOURCE_STING,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to create or get resources from uploads")
	}

	resources, err := s.serializer.UnmarshalResourcesFromProto(ctx, md.Resources)

	if err != nil {
		return nil, err
	}

	return resources, nil
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

		unmarshalled, err := s.serializer.UnmarshalResourceFromProto(ctx, r.NewResource)

		if err != nil {
			return nil, err
		}

		res = append(res, post.UnmarshalNewContentFromDatabase(itemId, r.OldResource.Id, unmarshalled))
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
