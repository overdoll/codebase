package adapters

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/sting/src/domain/post"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetUser(ctx context.Context, id string) (*post.User, error) {
	usr, err := s.client.GetUser(ctx, &eva.GetUserRequest{
		Id: id,
	})

	if err != nil {
		return nil, err
	}

	return &post.User{
		Id:       id,
		Roles:    usr.Roles,
		Verified: usr.Verified,
		Avatar:   usr.Avatar,
		Username: usr.Username,
	}, nil
}
