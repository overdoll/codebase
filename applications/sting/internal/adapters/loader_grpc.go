package adapters

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	loader "overdoll/applications/loader/proto"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
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

func (s LoaderGrpc) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool, token string, onlyImages bool, width uint64, height uint64) ([]*resource.Resource, error) {

	req := &loader.CreateOrGetResourcesFromUploadsRequest{
		ItemId: itemId, ResourceIds: resourceIds, Private: private, Token: token, Source: proto.SOURCE_STING, Config: &loader.Config{Height: height, Width: width},
	}

	if onlyImages {
		req.ValidationOptions = &loader.ValidationOptions{AllowImages: true, AllowVideos: false}
	}

	md, err := s.client.CreateOrGetResourcesFromUploads(ctx, req)

	if err != nil {

		st, ok := status.FromError(err)
		// invalid arguments from loader means that the file type was invalid or not allowed
		if ok && st.Code() == codes.InvalidArgument {
			return nil, domainerror.NewValidation("file type not allowed")
		}

		return nil, errors.Wrap(err, "failed to create or get resources from uploads")
	}

	resources, err := s.serializer.UnmarshalResourcesFromProto(ctx, md.Resources)

	if err != nil {
		return nil, err
	}

	return resources, nil
}

func (s LoaderGrpc) CopyResourceIntoImage(ctx context.Context, itemId string, resourceId string, private bool, width uint64, height uint64, newItemId string) (*post.NewResource, error) {

	var toApply []*loader.ResourceIdentifier

	toApply = append(toApply, &loader.ResourceIdentifier{
		Id:     resourceId,
		ItemId: itemId,
	})

	md, err := s.client.CopyResourcesAndApplyFilter(ctx, &loader.CopyResourcesAndApplyFilterRequest{
		Resources: toApply,
		Private:   private,
		Config:    &loader.Config{Height: height, Width: width},
		NewItemId: newItemId,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to copy resources")
	}

	var res []*post.NewResource
	for _, r := range md.Resources {

		unmarshalled, err := s.serializer.UnmarshalResourceFromProto(ctx, r.NewResource)

		if err != nil {
			return nil, err
		}

		res = append(res, post.UnmarshalNewResourceFromDatabase(r.OldResource.Id, unmarshalled))
	}

	return res[0], nil
}

func (s LoaderGrpc) CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool, token string) ([]*post.NewResource, error) {

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
		Token:     token,
		NewItemId: itemId,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to copy resources and apply pixelate filter")
	}

	var res []*post.NewResource
	for _, r := range md.Resources {

		unmarshalled, err := s.serializer.UnmarshalResourceFromProto(ctx, r.NewResource)

		if err != nil {
			return nil, err
		}

		res = append(res, post.UnmarshalNewResourceFromDatabase(r.OldResource.Id, unmarshalled))
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
