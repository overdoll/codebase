package adapters

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type CallbackGrpc struct {
	stingMediaCallback proto.MediaCallbackClient
}

func NewCallbackGrpc(stingMediaCallback proto.MediaCallbackClient) CallbackGrpc {
	return CallbackGrpc{stingMediaCallback: stingMediaCallback}
}

func (s CallbackGrpc) SendCallback(ctx context.Context, source string, medias *media.Media) error {

	if source == "STING" {

		_, err := s.stingMediaCallback.UpdateMedia(ctx, &proto.UpdateMediaRequest{Media: medias.Source()})

		if err != nil {
			if e, ok := status.FromError(err); ok {
				switch e.Code() {
				case codes.NotFound:
					return media_processing.ErrMediaCallbackNotFound
				default:
					return err
				}
			}

			return err
		}

		return nil
	}

	return errors.New("invalid source")
}
