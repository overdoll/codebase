package adapters

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/account"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetAccount(ctx context.Context, id string) (*account.Account, error) {
	usr, err := s.client.GetAccount(ctx, &eva.GetAccountRequest{
		Id: id,
	})

	if err != nil {
		return nil, err
	}

	return account.UnmarshalFromProto(usr), nil
}

func (s EvaGrpc) LockAccount(ctx context.Context, id string, duration int64) error {

	_, err := s.client.LockAccount(ctx, &eva.LockAccountRequest{
		Id:       id,
		Duration: duration,
		Reason:   eva.LockAccountReason_POST_INFRACTION,
	})

	if err != nil {
		return err
	}

	return nil
}
