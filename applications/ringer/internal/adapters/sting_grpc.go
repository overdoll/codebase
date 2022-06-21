package adapters

import (
	"context"
	"overdoll/applications/ringer/internal/domain/club"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) GetClubById(ctx context.Context, clubId string) (*club.Club, error) {

	res, err := s.client.GetClubById(ctx, &sting.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, errors.Wrap(err, "sting: failed to get club by id")
	}

	return club.UnmarshalClubFromDatabase(clubId, res.Club.Slug, res.Club.Name, res.Club.IsSuspended, res.Club.OwnerAccountId), nil
}

func (s StingGrpc) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {

	md, err := s.client.GetAccountClubDigest(ctx, &sting.GetAccountClubDigestRequest{AccountId: accountId})

	if err != nil {
		return nil, errors.Wrap(err, "sting: failed to get account club digest")
	}

	return principal.NewClubExtension(md)
}
