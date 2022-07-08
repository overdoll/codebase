package adapters

import (
	"context"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/errors"
)

type CarrierGrpc struct {
	client carrier.CarrierClient
}

func NewCarrierGrpc(client carrier.CarrierClient) CarrierGrpc {
	return CarrierGrpc{client: client}
}

func (s CarrierGrpc) SendModeratorPostInQueueNotification(ctx context.Context, accountId string) error {

	_, err := s.client.ModeratorPostInQueue(ctx, &carrier.ModeratorPostInQueueRequest{
		Account: &carrier.Account{Id: accountId},
	})

	if err != nil {
		return errors.Wrap(err, "error sending moderator post in queue notification")
	}

	return nil
}
