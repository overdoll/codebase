package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrExpiredAccountClubSupportSubscriptionNotFound = errors.New("expired account club support subscription not found")
)

type ExpiredAccountClubSupporterSubscription struct {
	*paging.Node

	accountId string
	clubId    string

	supporterSince time.Time
	cancelledAt    time.Time
	expiredAt      time.Time

	cancellationReasonId string
	ccbillSubscriptionId *string
}

func NewExpiredAccountClubSupporterSubscriptionFromSubscription(subscription *AccountClubSupporterSubscription, expiredAt time.Time) (*ExpiredAccountClubSupporterSubscription, error) {
	return &ExpiredAccountClubSupporterSubscription{
		accountId:            subscription.AccountId(),
		clubId:               subscription.ClubId(),
		supporterSince:       subscription.SupporterSince(),
		cancelledAt:          *subscription.CancelledAt(),
		expiredAt:            expiredAt,
		ccbillSubscriptionId: subscription.CCBillSubscriptionId(),
		cancellationReasonId: *subscription.CancellationReasonId(),
	}, nil
}

func (c *ExpiredAccountClubSupporterSubscription) AccountId() string {
	return c.accountId
}

func (c *ExpiredAccountClubSupporterSubscription) ClubId() string {
	return c.clubId
}

func (c *ExpiredAccountClubSupporterSubscription) CancellationReasonId() string {
	return c.cancellationReasonId
}

func (c *ExpiredAccountClubSupporterSubscription) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *ExpiredAccountClubSupporterSubscription) CalculateNewSupporterDate(newDate time.Time) time.Time {
	return c.supporterSince
}

func (c *ExpiredAccountClubSupporterSubscription) CancelledAt() time.Time {
	return c.cancelledAt
}

func (c *ExpiredAccountClubSupporterSubscription) ExpiredAt() time.Time {
	return c.expiredAt
}

func (c *ExpiredAccountClubSupporterSubscription) CCBillSubscriptionId() *string {
	return c.ccbillSubscriptionId
}

func UnmarshalExpiredAccountClubSupporterSubscriptionFromDatabase(accountId, clubId string, ccbillSubscriptionId *string, supporterSince, cancelledAt, expiredAt time.Time, cancellationReasonId string) *ExpiredAccountClubSupporterSubscription {
	return &ExpiredAccountClubSupporterSubscription{
		accountId:            accountId,
		clubId:               clubId,
		supporterSince:       supporterSince,
		cancelledAt:          cancelledAt,
		expiredAt:            expiredAt,
		ccbillSubscriptionId: ccbillSubscriptionId,
		cancellationReasonId: cancellationReasonId,
	}
}

func CanViewExpiredAccountClubSupporterSubscription(requester *principal.Principal, accountId string) error {
	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
