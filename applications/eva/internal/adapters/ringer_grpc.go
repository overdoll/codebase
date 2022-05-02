package adapters

import (
	"context"
	ringer "overdoll/applications/ringer/proto"
)

type RingerGrpc struct {
	client ringer.RingerClient
}

func NewRingerGrpc(client ringer.RingerClient) RingerGrpc {
	return RingerGrpc{client: client}
}

func (s RingerGrpc) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}
