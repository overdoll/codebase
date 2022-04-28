package adapters

import (
	"context"
	"overdoll/applications/ringer/internal/domain/club"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/principal"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) (*club.Club, error) {

	res, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(clubId, res.Club.Slug, res.Club.Name, res.Club.IsSuspended, res.Club.OwnerAccountId), nil
}

func (s StellaGrpc) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {

	md, err := s.client.GetAccountClubDigest(ctx, &stella.GetAccountClubDigestRequest{AccountId: accountId})

	if err != nil {
		return nil, err
	}

	return principal.NewClubExtension(md)
}
