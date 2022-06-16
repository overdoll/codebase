package adapters

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource/proto"
)

type CallbackGrpc struct {
	stingResourceCallback proto.ResourceCallbackClient
}

func NewCallbackGrpc(stingResourceCallback proto.ResourceCallbackClient) CallbackGrpc {
	return CallbackGrpc{stingResourceCallback: stingResourceCallback}
}

func (s CallbackGrpc) SendCallback(ctx context.Context, source string, resources []*resource.Resource) error {

	var results []*proto.Resource

	for _, res := range resources {
		results = append(results, resource.ToProto(res))
	}

	if source == "STING" {

		_, err := s.stingResourceCallback.UpdateResources(ctx, &proto.UpdateResourcesRequest{Resources: results})

		if err != nil {
			if e, ok := status.FromError(err); ok {
				switch e.Code() {
				case codes.NotFound:
					return resource.ErrResourceCallbackNotFound
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
