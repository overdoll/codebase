package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/errors"
	"overdoll/libraries/money"

	carrier "overdoll/applications/carrier/proto"
)

type CarrierGrpc struct {
	client carrier.CarrierClient
}

func NewCarrierGrpc(client carrier.CarrierClient) CarrierGrpc {
	return CarrierGrpc{client: client}
}

func (s CarrierGrpc) NewClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {

	_, err := s.client.NewClubSupporterSubscription(ctx, &carrier.NewClubSupporterSubscriptionRequest{
		Account:         &carrier.Account{Id: subscription.AccountId()},
		Club:            &carrier.Club{Id: subscription.ClubId()},
		Subscription:    &carrier.Subscription{Id: subscription.Id()},
		Payment:         &carrier.Payment{Amount: subscription.BillingAmount(), Currency: subscription.BillingCurrency().String()},
		BillingDate:     timestamppb.New(subscription.LastBillingDate()),
		NextBillingDate: timestamppb.New(subscription.NextBillingDate()),
	})

	if err != nil {
		return errors.Wrap(err, "error sending new club supporter subscription email")
	}

	return nil
}

func (s CarrierGrpc) ClubSupporterSubscriptionDuplicate(ctx context.Context, accountId string, clubId string, amount uint64, currency money.Currency) error {

	_, err := s.client.ClubSupporterSubscriptionDuplicate(ctx, &carrier.ClubSupporterSubscriptionDuplicateRequest{
		Account: &carrier.Account{Id: accountId},
		Club:    &carrier.Club{Id: clubId},
		Payment: &carrier.Payment{Amount: amount, Currency: currency.String()},
	})

	if err != nil {
		return errors.Wrap(err, "error sending club supporter subscription duplicate email")
	}

	return nil
}

func (s CarrierGrpc) ClubSupporterSubscriptionCancelled(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {
	return nil
}

func (s CarrierGrpc) ClubSupporterSubscriptionRefunded(ctx context.Context, subscription *billing.AccountClubSupporterSubscription, transaction *billing.AccountTransaction, amount uint64, currency money.Currency) error {

	_, err := s.client.ClubSupporterSubscriptionRefunded(ctx, &carrier.ClubSupporterSubscriptionRefundedRequest{
		Account:      &carrier.Account{Id: subscription.AccountId()},
		Club:         &carrier.Club{Id: subscription.ClubId()},
		Subscription: &carrier.Subscription{Id: subscription.Id()},
		Transaction:  &carrier.Transaction{Id: transaction.Id()},
		Refund:       &carrier.Payment{Amount: amount, Currency: currency.String()},
	})

	if err != nil {
		return errors.Wrap(err, "error sending club supporter subscription refunded email")
	}

	return nil
}

func (s CarrierGrpc) ClubSupporterSubscriptionPaymentFailure(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {

	_, err := s.client.ClubSupporterSubscriptionPaymentFailure(ctx, &carrier.ClubSupporterSubscriptionPaymentFailureRequest{
		Account:      &carrier.Account{Id: subscription.AccountId()},
		Club:         &carrier.Club{Id: subscription.ClubId()},
		Subscription: &carrier.Subscription{Id: subscription.Id()},
	})

	if err != nil {
		return errors.Wrap(err, "error sending club supporter subscription payment failure email")
	}

	return nil
}

func (s CarrierGrpc) UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, accountId string, subscriptions []*billing.AccountClubSupporterSubscription) error {

	var renewals []*carrier.SubscriptionRenewal

	for _, subscription := range subscriptions {
		renewals = append(renewals, &carrier.SubscriptionRenewal{
			Club:         &carrier.Club{Id: subscription.ClubId()},
			Subscription: &carrier.Subscription{Id: subscription.Id()},
			Payment:      &carrier.Payment{Amount: subscription.BillingAmount(), Currency: subscription.BillingCurrency().String()},
			BillingDate:  timestamppb.New(subscription.NextBillingDate()),
		})
	}

	_, err := s.client.UpcomingClubSupporterSubscriptionRenewals(ctx, &carrier.UpcomingClubSupporterSubscriptionRenewalsRequest{
		Account:  &carrier.Account{Id: accountId},
		Renewals: renewals,
	})

	if err != nil {
		return errors.Wrap(err, "error sending upcoming club supporter subscription renewals email")
	}

	return nil
}

func (s CarrierGrpc) ClubOverChargebackThreshold(ctx context.Context, clubId string, threshold float64) error {

	_, err := s.client.ClubOverChargebackThreshold(ctx, &carrier.ClubOverChargebackThresholdRequest{
		Club:      &carrier.Club{Id: clubId},
		Threshold: threshold,
	})

	if err != nil {
		return errors.Wrap(err, "error sending club over chargeback threshold email")
	}

	return nil
}
