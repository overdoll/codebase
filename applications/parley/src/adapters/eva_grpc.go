package adapters

import (
	"context"
	"time"

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

func (s EvaGrpc) LockUser(ctx context.Context, id string, expiration time.Time) (*user.User, error) {

	usr, err := s.client.LockUser(ctx, &eva.LockUserRequest{
		Id: id,
		// instead of sending expiration (which is what we get here), we send duration in MS
		Duration: (expiration.UnixNano() / int64(time.Millisecond)) - (time.Now().UnixNano() / int64(time.Millisecond)),
	})

	if err != nil {
		return nil, err
	}

	return user.UnmarshalFromProto(usr), nil
}
