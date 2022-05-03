package adapters

import (
	"context"
	stella "overdoll/applications/stella/proto"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {

	md, err := s.client.GetAccountClubDigest(ctx, &stella.GetAccountClubDigestRequest{AccountId: accountId})

	if err != nil {
		return nil, err
	}

	return principal.NewClubExtension(md)
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) (*club.Club, error) {

	md, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(clubId, md.Club.Slug, md.Club.Name, md.Club.IsSuspended, md.Club.OwnerAccountId), nil
}

func (s StellaGrpc) NewSupporterPost(ctx context.Context, clubId string) error {

	_, err := s.client.NewSupporterPost(ctx, &stella.NewSupporterPostRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}
