package adapters

import (
	"context"
	"overdoll/applications/carrier/internal/domain/club"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/errors"
)

type StingGrpc struct {
	client sting.StingClient
}

func NewStingGrpc(client sting.StingClient) StingGrpc {
	return StingGrpc{client: client}
}

func (s StingGrpc) GetClub(ctx context.Context, clubId string) (*club.Club, error) {

	md, err := s.client.GetClubById(ctx, &sting.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, errors.Wrap(err, "error retrieving club")
	}

	return club.UnmarshalClubFromDatabase(md.Club.Slug, md.Club.Name, md.Club.OwnerAccountId), nil
}
