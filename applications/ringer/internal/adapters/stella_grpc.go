package adapters

import (
	"context"
	"overdoll/applications/ringer/internal/domain/club"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/errors"
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
		return nil, errors.Wrap(err, "stella: failed to get club by id")
	}

	return club.UnmarshalClubFromDatabase(clubId, res.Club.Slug, res.Club.Name, res.Club.IsSuspended, res.Club.OwnerAccountId), nil
}

func (s StellaGrpc) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {

	md, err := s.client.GetAccountClubDigest(ctx, &stella.GetAccountClubDigestRequest{AccountId: accountId})

	if err != nil {
		return nil, errors.Wrap(err, "stella: failed to get account club digest")
	}

	return principal.NewClubExtension(md)
}
