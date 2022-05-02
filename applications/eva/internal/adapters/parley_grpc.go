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

func (s ParleyGrpc) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}
