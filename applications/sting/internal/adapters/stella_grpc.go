package adapters

import (
	"context"
	stella "overdoll/applications/stella/proto"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetClub(ctx context.Context, id string) (bool, error) {

	md, err := s.client.GetClub(ctx, &stella.GetClubRequest{Id: id})

	if err != nil {
		return false, err
	}

	if md == nil {
		return false, nil
	}

	return true, nil
}
