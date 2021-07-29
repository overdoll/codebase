package adapters

import (
	"context"

	"overdoll/applications/carrier/internal/domain/identifier"
	eva "overdoll/applications/eva/proto"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetAccount(ctx context.Context, id string) (*identifier.Identifier, error) {

	usr, err := s.client.GetAccount(ctx, &eva.GetAccountRequest{
		Id: id,
	})

	if err != nil {
		return nil, err
	}

	return identifier.UnmarshalIdentifierFromDatabase(usr.Id, usr.Username, usr.Email), nil
}
