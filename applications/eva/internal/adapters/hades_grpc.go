package adapters

import (
	"context"
)

type HadesGrpc struct {
	client hades.HadesClient
}

func NewHadesGrpc(client hades.HadesClient) HadesGrpc {
	return HadesGrpc{client: client}
}

func (s HadesGrpc) CanDeleteAccountData(ctx context.Context, accountId string) (bool, error) {
	return false, nil
}

func (s HadesGrpc) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}
