package adapters

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/common"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetUser(ctx context.Context, id string) (*common.User, error) {
	usr, err := s.client.GetUser(ctx, &eva.GetUserRequest{
		Id: id,
	})

	if err != nil {
		return nil, err
	}

	return &common.User{
		Id:       id,
		Roles:    usr.Roles,
		Verified: usr.Verified,
		Avatar:   usr.Avatar,
		Username: usr.Username,
	}, nil
}
