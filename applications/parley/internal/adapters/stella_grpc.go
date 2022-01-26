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

func (s StellaGrpc) CanAccountPostUnderClub(ctx context.Context, clubId, accountId string) (bool, error) {

	md, err := s.client.CanAccountPostUnderClub(ctx, &stella.CanAccountPostUnderClubRequest{ClubId: clubId, AccountId: accountId})

	if err != nil {
		return false, err
	}

	if md == nil {
		return false, nil
	}

	return md.Allowed, nil
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) error {

	_, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}

func (s StellaGrpc) SuspendClub(ctx context.Context, clubId string, endTime int64) error {

	_, err := s.client.SuspendClub(ctx, &stella.SuspendClubRequest{ClubId: clubId, EndTimeUnix: endTime})

	if err != nil {
		return err
	}

	return nil
}
