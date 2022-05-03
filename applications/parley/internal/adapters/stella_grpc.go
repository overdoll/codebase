package adapters

import (
	"context"
	stella "overdoll/applications/stella/proto"
)

type StellaGrpc struct {
	client stella.StellaClient
}

func NewStellaGrpc(client stella.StellaClient) StellaGrpc {
	return StellaGrpc{client: client}
}

func (s StellaGrpc) GetClubById(ctx context.Context, clubId string) error {

	_, err := s.client.GetClubById(ctx, &stella.GetClubByIdRequest{ClubId: clubId})

	if err != nil {
		return err
	}

	return nil
}

func (s StellaGrpc) SuspendClub(ctx context.Context, clubId string, endTime int64, isModerationQueue bool, isPostRemoval bool) error {

	var reason stella.SuspensionSource

	if isModerationQueue {
		reason = stella.SuspensionSource_POST_MODERATION_QUEUE
	}

	if isPostRemoval {
		reason = stella.SuspensionSource_POST_REMOVAL
	}

	// manual
	if !isPostRemoval && !isModerationQueue {
		reason = stella.SuspensionSource_MANUAL
	}

	_, err := s.client.SuspendClub(ctx, &stella.SuspendClubRequest{ClubId: clubId, EndTimeUnix: endTime, Source: reason})

	if err != nil {
		return err
	}

	return nil
}
