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

func (s EvaGrpc) ValidateSession(ctx context.Context, token string) (*common.User, error) {
	usr, err := s.client.ValidateSession(ctx, &eva.SessionRequest{Token: token})

	if err != nil {
		return nil, err
	}

	return &common.User{
		Id:       usr.User.Id,
		Roles:    usr.User.Roles,
		Verified: usr.User.Verified,
		Avatar:   usr.User.Avatar,
		Username: usr.User.Username,
	}, nil
}
