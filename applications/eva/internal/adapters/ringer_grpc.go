package adapters

import (
	"context"
	ringer "overdoll/applications/ringer/proto"
	"overdoll/libraries/errors"
)

type RingerGrpc struct {
	client ringer.RingerClient
}

func NewRingerGrpc(client ringer.RingerClient) RingerGrpc {
	return RingerGrpc{client: client}
}

func (s RingerGrpc) DeleteAccountData(ctx context.Context, accountId string) error {

	_, err := s.client.DeleteAccountData(ctx, &ringer.DeleteAccountDataRequest{AccountId: accountId})

	if err != nil {
		return errors.Wrap(err, "error deleting account data")
	}

	return nil
}
