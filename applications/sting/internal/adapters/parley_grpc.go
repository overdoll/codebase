package adapters

import (
	"context"

	parley "overdoll/applications/parley/proto"
)

type ParleyGrpc struct {
	client parley.ParleyClient
}

func NewParleyGrpc(client parley.ParleyClient) ParleyGrpc {
	return ParleyGrpc{client: client}
}

func (s ParleyGrpc) PutPostIntoModeratorQueueOrPublish(ctx context.Context, postId string) (bool, error) {

	res, err := s.client.PutPostIntoModeratorQueueOrPublish(ctx, &parley.PutPostIntoModeratorQueueOrPublishRequest{
		PostId: postId,
	})

	if err != nil {
		return false, err
	}

	return res.PutIntoReview, nil
}
