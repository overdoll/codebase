package adapters

import (
	"context"
	"overdoll/libraries/errors"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/principal"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetAccount(ctx context.Context, id string) (*principal.Principal, error) {

	acc, err := s.client.GetAccount(ctx, &eva.GetAccountRequest{
		Id: id,
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to get account")
	}

	if acc == nil {
		return nil, nil
	}

	return principal.UnmarshalFromEvaProto(acc), nil
}
