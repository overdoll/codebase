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

func (s StellaGrpc) CanAccountCreatePostUnderClub(ctx context.Context, accountId, clubId string) (bool, error) {

	res, err := s.client.CanAccountCreatePostUnderClub(ctx, &stella.CanAccountCreatePostUnderClubRequest{ClubId: clubId, AccountId: accountId})

	if err != nil {
		return false, err
	}

	return res.Allowed, nil
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) (*string, error) {

	res, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, err
	}

	return &res.Club.OwnerAccountId, nil
}
