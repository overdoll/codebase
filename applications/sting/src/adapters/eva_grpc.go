package adapters

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/user"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetUser(ctx context.Context, id string) (*user.User, error) {
	usr, err := s.client.GetUser(ctx, &eva.GetUserRequest{
		Id: id,
	})

	if err != nil {
		return nil, err
	}

	return user.UnmarshalFromProto(usr), nil
}

func (s EvaGrpc) CreateUser(ctx context.Context, username, email string) (*user.User, error) {
	usr, err := s.client.CreateUser(ctx, &eva.CreateUserRequest{
		Username: username,
		Email:    email,
	})

	if err != nil {
		return nil, err
	}

	return user.UnmarshalFromProto(usr), nil
}
