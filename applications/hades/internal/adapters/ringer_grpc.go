package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/domain/billing"
	ringer "overdoll/applications/ringer/proto"
	"time"
)

type RingerGrpc struct {
	client ringer.RingerClient
}

func NewRingerGrpc(client ringer.RingerClient) RingerGrpc {
	return RingerGrpc{client: client}
}

func (s RingerGrpc) NewClubSupporterSubscriptionPaymentDeposit(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error {

	_, err := s.client.ClubPaymentDeposit(ctx, &ringer.ClubPaymentDepositRequest{
		AccountTransactionId: transactionId,
		SourceAccountId:      accountId,
		DestinationClubId:    clubId,
		Payment: &ringer.Payment{
			Amount:   price.Amount(),
			Currency: price.Currency().String(),
		},
		Timestamp: timestamppb.New(timestamp),
		Source:    ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION,
	})

	if err != nil {
		return err
	}

	return nil
}

func (s RingerGrpc) NewClubSupporterSubscriptionPaymentDeduction(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error {

	_, err := s.client.ClubPaymentDeposit(ctx, &ringer.ClubPaymentDepositRequest{
		AccountTransactionId: transactionId,
		SourceAccountId:      accountId,
		DestinationClubId:    clubId,
		Payment: &ringer.Payment{
			Amount:   price.Amount(),
			Currency: price.Currency().String(),
		},
		Timestamp: timestamppb.New(timestamp),
		Source:    ringer.PaymentSource_CLUB_SUPPORTER_SUBSCRIPTION,
	})

	if err != nil {
		return err
	}

	return nil
}
