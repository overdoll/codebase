package billing

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type ExpiredAccountClubSupporterSubscription struct {
	*paging.Node

	accountId string
	clubId    string

	supporterSince time.Time
	cancelledAt    time.Time
	expiredAt      time.Time

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
	}, nil
}

func (c *ExpiredAccountClubSupporterSubscription) AccountId() string {
	return c.accountId
}

func (c *ExpiredAccountClubSupporterSubscription) ClubId() string {
	return c.clubId
}

func (c *ExpiredAccountClubSupporterSubscription) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *ExpiredAccountClubSupporterSubscription) CalculateNewSupporterDate(newDate time.Time) time.Time {
	oldDuration := c.expiredAt.Sub(c.supporterSince)
	return newDate.Add(-oldDuration)
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

func UnmarshalExpiredAccountClubSupporterSubscriptionFromDatabase(accountId, clubId string, ccbillSubscriptionId *string, supporterSince, cancelledAt, expiredAt time.Time) *ExpiredAccountClubSupporterSubscription {
	return &ExpiredAccountClubSupporterSubscription{
		accountId:            accountId,
		clubId:               clubId,
		supporterSince:       supporterSince,
		cancelledAt:          cancelledAt,
		expiredAt:            expiredAt,
		ccbillSubscriptionId: ccbillSubscriptionId,
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
