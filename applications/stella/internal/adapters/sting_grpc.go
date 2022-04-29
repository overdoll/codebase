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

func (s StingGrpc) AddSuspendedClub(ctx context.Context, clubId string) error {

	_, err := s.client.AddSuspendedClub(ctx, &sting.AddSuspendedClubRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}

func (s StingGrpc) RemoveSuspendedClub(ctx context.Context, clubId string) error {

	_, err := s.client.RemoveSuspendedClub(ctx, &sting.RemoveSuspendedClubRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}
