package adapters

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetUser(ctx context.Context, id ksuid.UUID) (*post.User, error) {
	usr, err := s.client.GetUser(ctx, &eva.GetUserRequest{
		Id: id.String(),
	})

	if err != nil {
		return nil, err
	}

	ids, err := ksuid.Parse(usr.Id)

	if err != nil {
		return nil, err
	}

	return &post.User{
		Id:       ids,
		Roles:    usr.Roles,
		Verified: usr.Verified,
		Avatar:   usr.Avatar,
		Username: usr.Username,
	}, nil
}
