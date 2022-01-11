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

func (s StellaGrpc) GetClubMembershipsForAccount(ctx context.Context, accountId string) ([]string, error) {
	md, err := s.client.GetAccountClubMembershipIds(ctx, &stella.GetAccountClubMembershipIdsRequest{AccountId: accountId})

	if err != nil {
		return nil, err
	}

	return md.ClubIds, nil
}
