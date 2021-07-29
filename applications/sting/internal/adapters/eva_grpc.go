package adapters

import (
	"context"

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
		return nil, err
	}

	return principal.UnmarshalFromEvaProto(acc), nil
}

func (s EvaGrpc) CreateAccount(ctx context.Context, username, email string) (*principal.Principal, error) {

	acc, err := s.client.CreateAccount(ctx, &eva.CreateAccountRequest{
		Username: username,
		Email:    email,
	})

	if err != nil {
		return nil, err
	}

	return principal.UnmarshalFromEvaProto(acc), nil
}
