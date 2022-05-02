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

func (s StellaGrpc) CanDeleteAccountData(ctx context.Context, accountId string) (bool, error) {
	return false, nil
}

func (s StellaGrpc) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}
