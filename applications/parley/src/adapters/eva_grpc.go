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

func (s EvaGrpc) LockUser(ctx context.Context, id string, duration int64) error {

	_, err := s.client.LockUser(ctx, &eva.LockUserRequest{
		Id:       id,
		Duration: duration,
		Reason:   eva.LockUserReason_POST_INFRACTION,
	})

	if err != nil {
		return err
	}

	return nil
}
