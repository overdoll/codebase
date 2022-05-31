package adapters

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/carrier/internal/domain/club"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/errors"
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
		zap.S().Errorw("error retrieving club", zap.Error(err))
		return nil, errors.Wrap(err, "error retrieving club")
	}

	return club.UnmarshalClubFromDatabase(md.Club.Slug, md.Club.Name, md.Club.OwnerAccountId), nil
}
