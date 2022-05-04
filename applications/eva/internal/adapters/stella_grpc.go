package adapters

import (
	"context"
	stella "overdoll/applications/stella/proto"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) HasNonTerminatedClubs(ctx context.Context, accountId string) (bool, error) {

	res, err := s.client.CanDeleteAccountData(ctx, &stella.CanDeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return false, err
	}

	return res.CanDelete, nil
}

func (s StellaGrpc) DeleteAccountData(ctx context.Context, accountId string) error {

	_, err := s.client.DeleteAccountData(ctx, &stella.DeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return err
	}

	return nil
}
