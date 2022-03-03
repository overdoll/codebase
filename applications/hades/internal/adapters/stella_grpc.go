package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	stella "overdoll/applications/stella/proto"
	"time"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) CanAccountBecomeClubSupporter(ctx context.Context, clubId, accountId string) (bool, error) {

	md, err := s.client.CanAccountBecomeClubSupporter(ctx, &stella.CanAccountBecomeClubSupporterRequest{ClubId: clubId, AccountId: accountId})

	if err != nil {
		return false, err
	}

	if md == nil {
		return false, nil
	}

	return md.Allowed, nil
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
