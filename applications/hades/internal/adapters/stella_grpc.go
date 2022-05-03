package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/domain/club"
	stella "overdoll/applications/stella/proto"
	"time"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) (*club.Club, error) {

	md, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(clubId, md.Club.Slug, md.Club.Name, md.Club.IsSuspended, md.Club.CanSupport, md.Club.OwnerAccountId), nil
}

func (s StellaGrpc) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {

	_, err := s.client.AddClubSupporter(ctx, &stella.AddClubSupporterRequest{ClubId: clubId, AccountId: accountId, SupportedAt: timestamppb.New(supportedAt)})

	if err != nil {
		return err
	}

	return nil
}

func (s StellaGrpc) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {

	_, err := s.client.RemoveClubSupporter(ctx, &stella.RemoveClubSupporterRequest{ClubId: clubId, AccountId: accountId})

	if err != nil {
		return err
	}

	return nil
}
