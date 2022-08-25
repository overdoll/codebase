package adapters

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	loader "overdoll/applications/loader/proto"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/domain/resource_options"
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

func (s LoaderGrpc) CopyResourceIntoImage(ctx context.Context, options *resource_options.ResourceOptions) (*post.NewResource, error) {

	var toApply []*loader.ResourceIdentifier

	toApply = append(toApply, &loader.ResourceIdentifier{
		Id:     options.ResourceId(),
		ItemId: options.Id(),
	})

	md, err := s.client.CopyResourcesAndApplyFilter(ctx, &loader.CopyResourcesAndApplyFilterRequest{
		Resources: toApply,
		Private:   options.Private(),
		Config:    &loader.Config{Height: uint64(options.Height()), Width: uint64(options.Width())},
		NewItemId: options.NewId(),
		Token:     options.Token(),
		Source:    proto.SOURCE_STING,
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

func (s LoaderGrpc) ReprocessResources(ctx context.Context, itemId string, resourceIds []string, width uint64, height uint64) error {

	var toApply []*loader.ResourceIdentifier

	for _, r := range resourceIds {
		toApply = append(toApply, &loader.ResourceIdentifier{
			Id:     r,
			ItemId: itemId,
		})
	}

	md, err := s.client.ReprocessResources(ctx, &loader.ReprocessResourcesRequest{
		Resources: toApply,
		Config: &loader.Config{
			Width:  width,
			Height: height,
		},
	})

	if err != nil {
		return errors.Wrap(err, "failed to reprocess resources")
	}

	var res []*resource.Resource
	for _, r := range md.Resources {

		unmarshalled, err := s.serializer.UnmarshalResourceFromProto(ctx, r)

		if err != nil {
			return err
		}

		res = append(res, unmarshalled)
	}

	return nil
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

	return nil

	_, err := s.client.DeleteResources(ctx, &loader.DeleteResourcesRequest{ItemId: itemId, ResourceIds: resourceIds})

	if err != nil {
		return errors.Wrap(err, "failed to delete resources")
	}

	return nil
}
