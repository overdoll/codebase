package adapters

import (
	"context"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/errors"
)

type HadesGrpc struct {
	client hades.HadesClient
}

func NewHadesGrpc(client hades.HadesClient) HadesGrpc {
	return HadesGrpc{client: client}
}

func (s HadesGrpc) CanDeleteAccountData(ctx context.Context, accountId string) (bool, error) {

	res, err := s.client.CanDeleteAccountData(ctx, &hades.CanDeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return false, errors.Wrap(err, "error checking if can delete account data")
	}

	return res.CanDelete, nil
}

func (s HadesGrpc) DeleteAccountData(ctx context.Context, accountId string) error {

	_, err := s.client.DeleteAccountData(ctx, &hades.DeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return errors.Wrap(err, "error deleting account data")
	}

	return nil
}
