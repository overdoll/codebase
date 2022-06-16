package adapters

import (
	"context"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/errors"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) DeleteAccountData(ctx context.Context, accountId string) error {

	_, err := s.client.DeleteAccountData(ctx, &sting.DeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return errors.Wrap(err, "error deleting account data")
	}

	return nil
}

func (s StingGrpc) CanDeleteAccountData(ctx context.Context, accountId string) (bool, error) {

	res, err := s.client.CanDeleteAccountData(ctx, &sting.CanDeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return false, errors.Wrap(err, "error checking if can delete account data")
	}

	return res.CanDelete, nil
}
