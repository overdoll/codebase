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
