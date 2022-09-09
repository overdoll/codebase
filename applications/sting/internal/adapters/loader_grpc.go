package adapters

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	loader "overdoll/applications/loader/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type LoaderGrpc struct {
	client loader.LoaderClient
}

func NewLoaderGrpc(client loader.LoaderClient) LoaderGrpc {
	return LoaderGrpc{client: client}
}

func (s LoaderGrpc) ProcessMediaFromUploads(ctx context.Context, uploadIds []string, link *media.Link) ([]*media.Media, error) {

	md, err := s.client.ProcessMediaFromUploads(ctx, &loader.ProcessMediaFromUploadsRequest{
		Link:      link.RawProto(),
		Source:    proto.SOURCE_STING,
		UploadIds: uploadIds,
	})

	if err != nil {

		st, ok := status.FromError(err)
		// invalid arguments from loader means that the file type was invalid or not allowed
		if ok && st.Code() == codes.InvalidArgument {
			return nil, domainerror.NewValidation("file type not allowed")
		}

		return nil, errors.Wrap(err, "failed to process media from uploads")
	}

	var medias []*media.Media

	for _, m := range md.Media {
		medias = append(medias, media.FromProto(m))
	}

	return medias, nil
}

func (s LoaderGrpc) GenerateImageFromMedia(ctx context.Context, sources []*media.Media, link *media.Link, pixelate *int64) ([]*media.Media, error) {

	var mediaSources []*proto.Media

	for _, source := range sources {
		mediaSources = append(mediaSources, source.RawProto())
	}

	var filters *loader.Filters

	if pixelate != nil {
		filters = &loader.Filters{Pixelate: &loader.PixelateFilter{Size: *pixelate}}
	}

	md, err := s.client.GenerateImageFromMedia(ctx, &loader.GenerateImageFromMediaRequest{
		Media:   mediaSources,
		Link:    link.RawProto(),
		Source:  proto.SOURCE_STING,
		Filters: filters,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to generate image from media")
	}

	var medias []*media.Media

	for _, m := range md.Media {
		medias = append(medias, media.FromProto(m))
	}

	return medias, nil
}
