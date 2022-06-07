package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/domain/club"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
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
		return nil, errors.Wrap(err, "error getting club by id")
	}

	return club.UnmarshalClubFromDatabase(clubId, md.Club.Slug, md.Club.Name, md.Club.IsSuspended, md.Club.CanSupport, md.Club.OwnerAccountId), nil
}

func (s StellaGrpc) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {

	_, err := s.client.AddClubSupporter(ctx, &stella.AddClubSupporterRequest{ClubId: clubId, AccountId: accountId, SupportedAt: timestamppb.New(supportedAt)})

	if err != nil {
		return errors.Wrap(err, "error adding club supporter")
	}

	return nil
}

func (s StellaGrpc) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {

	_, err := s.client.RemoveClubSupporter(ctx, &stella.RemoveClubSupporterRequest{ClubId: clubId, AccountId: accountId})

	if err != nil {
		return errors.Wrap(err, "error removing club supporter")
	}

	return nil
}

func (s StellaGrpc) SuspendClub(ctx context.Context, clubId string, isChargeback bool) error {

	_, err := s.client.SuspendClub(ctx, &stella.SuspendClubRequest{
		ClubId:             clubId,
		EndTimeUnix:        0,
		InitiatorAccountId: nil,
		Source:             stella.SuspensionSource_AUTOMATED_CHARGEBACKS,
	})

	if err != nil {
		return errors.Wrap(err, "error suspending club")
	}

	return nil
}

func (s StellaGrpc) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {

	md, err := s.client.GetAccountClubDigest(ctx, &stella.GetAccountClubDigestRequest{AccountId: accountId})

	if err != nil {
		return nil, errors.Wrap(err, "error getting account club digest")
	}

	return principal.NewClubExtension(md)
}
