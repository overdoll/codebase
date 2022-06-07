package adapters

import (
	"context"
	parley "overdoll/applications/parley/proto"
	"overdoll/libraries/errors"
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
		return errors.Wrap(err, "error deleting account data")
	}

	return nil
}
