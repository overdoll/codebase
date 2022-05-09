package adapters

import (
	"context"
	sting "overdoll/applications/sting/proto"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) AddTerminatedClub(ctx context.Context, clubId string) error {

	_, err := s.client.AddTerminatedClub(ctx, &sting.AddTerminatedClubRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) RemoveTerminatedClub(ctx context.Context, clubId string) error {

	_, err := s.client.RemoveTerminatedClub(ctx, &sting.RemoveTerminatedClubRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}
