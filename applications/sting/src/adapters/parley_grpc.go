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

func (s ParleyGrpc) GetNextModeratorId(ctx context.Context) (string, error) {
	md, err := s.client.GetNextModerator(ctx, &parley.GetModeratorRequest{})

	if err != nil {
		return "", err
	}

	return md.Id, nil
}
