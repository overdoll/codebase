package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/libraries/errors"
	"time"

	carrier "overdoll/applications/carrier/proto"
)

type CarrierGrpc struct {
	client carrier.CarrierClient
}

func NewCarrierGrpc(client carrier.CarrierClient) CarrierGrpc {
	return CarrierGrpc{client: client}
}

func (s CarrierGrpc) ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, time time.Duration) error {

	_, err := s.client.ClubSupporterRequiredPostReminder(ctx, &carrier.ClubSupporterRequiredPostReminderRequest{
		Club:       &carrier.Club{Id: clubId},
		TimePassed: time.Milliseconds(),
	})

	if err != nil {
		return errors.Wrap(err, "carrier - failed to send club supporter required post email")
	}

	return nil
}

func (s CarrierGrpc) PostFailedProcessing(ctx context.Context, postId string) error {

	_, err := s.client.PostFailedProcessing(ctx, &carrier.PostFailedProcessingRequest{
		Post: &carrier.Post{Id: postId},
	})

	if err != nil {
		return errors.Wrap(err, "carrier - failed to send post failed processing email")
	}

	return nil
}

func (s CarrierGrpc) ClubSupporterNoPosts(ctx context.Context, clubId string) error {

	_, err := s.client.ClubSupporterNoPosts(ctx, &carrier.ClubSupporterNoPostsRequest{
		Club: &carrier.Club{Id: clubId},
	})

	if err != nil {
		return errors.Wrap(err, "carrier - failed to send club supporter no posts email")
	}

	return nil
}

func (s CarrierGrpc) ClubSuspended(ctx context.Context, clubId string, endTime time.Time) error {

	_, err := s.client.ClubSuspended(ctx, &carrier.ClubSuspendedRequest{
		Club:    &carrier.Club{Id: clubId},
		EndTime: timestamppb.New(endTime),
	})

	if err != nil {
		return errors.Wrap(err, "carrier - failed to send club suspended email")
	}

	return nil
}
