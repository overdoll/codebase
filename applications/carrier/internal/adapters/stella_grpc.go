package adapters

import (
	"context"
	"overdoll/applications/carrier/internal/domain/club"
	stella "overdoll/applications/stella/proto"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetClub(ctx context.Context, clubId string) (*club.Club, error) {

	md, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(md.Club.Slug, md.Club.Name), nil
}
