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

	_, err := s.client.DeleteAccountData(ctx, &parley.DeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return err
	}

	return nil
}
