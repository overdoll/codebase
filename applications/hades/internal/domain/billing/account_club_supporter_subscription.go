package billing

import (
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrAccountClubSupportSubscriptionDuplicate = domainerror.NewValidation("account club support subscription is duplicate")
)

type AccountClubSupporterSubscription struct {
	*paging.Node

	accountId string
	clubId    string

	id string

	status SupportStatus

	supporterSince  time.Time
	lastBillingDate time.Time
	nextBillingDate time.Time

	createdAt time.Time
	updatedAt time.Time

	cancelledAt *time.Time
	expiredAt   *time.Time

	billingAmount   uint64
	billingCurrency money.Currency

	paymentMethod *PaymentMethod

	ccbillSubscriptionId *string

	cancellationReasonId *string

	failedAt                    *time.Time
	ccbillErrorText             *string
	ccbillErrorCode             *string
	billingFailureNextRetryDate *time.Time
}

func NewAccountClubSupporterSubscriptionFromCCBill(id, accountId, clubId string, ccbillSubscriptionId string, supporterSince, lastBillingDate, nextBillingDate time.Time, amount uint64, currency money.Currency, paymentMethod *PaymentMethod, timestamp time.Time) (*AccountClubSupporterSubscription, error) {
	return &AccountClubSupporterSubscription{
		accountId:            accountId,
		clubId:               clubId,
		id:                   id,
		status:               Active,
		supporterSince:       supporterSince,
		lastBillingDate:      lastBillingDate,
		nextBillingDate:      nextBillingDate,
		cancelledAt:          nil,
		expiredAt:            nil,
		billingAmount:        amount,
		createdAt:            timestamp,
		billingCurrency:      currency,
		paymentMethod:        paymentMethod,
		updatedAt:            time.Now(),
		ccbillSubscriptionId: &ccbillSubscriptionId,
	}, nil
}

func (c *AccountClubSupporterSubscription) Id() string {
	return c.id
}

func (c *AccountClubSupporterSubscription) AccountId() string {
	return c.accountId
}

func (c *AccountClubSupporterSubscription) ClubId() string {
	return c.clubId
}

func (c *AccountClubSupporterSubscription) CancellationReasonId() *string {
	return c.cancellationReasonId
}

func (c *AccountClubSupporterSubscription) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *AccountClubSupporterSubscription) CreatedAt() time.Time {
	return c.createdAt
}

func (c *AccountClubSupporterSubscription) IsActive() bool {
	return c.status == Active
}

func (c *AccountClubSupporterSubscription) Status() SupportStatus {
	return c.status
}

func (c *AccountClubSupporterSubscription) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *AccountClubSupporterSubscription) CancelledAt() *time.Time {
	return c.cancelledAt
}

func (c *AccountClubSupporterSubscription) LastBillingDate() time.Time {
	return c.lastBillingDate
}

func (c *AccountClubSupporterSubscription) NextBillingDate() time.Time {
	return c.nextBillingDate
}

func (c *AccountClubSupporterSubscription) BillingAmount() uint64 {
	return c.billingAmount
}

func (c *AccountClubSupporterSubscription) BillingCurrency() money.Currency {
	return c.billingCurrency
}

func (c *AccountClubSupporterSubscription) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountClubSupporterSubscription) CCBillSubscriptionId() *string {
	return c.ccbillSubscriptionId
}

func (c *AccountClubSupporterSubscription) FailedAt() *time.Time {
	return c.failedAt
}

func (c *AccountClubSupporterSubscription) ExpiredAt() *time.Time {
	return c.expiredAt
}

func (c *AccountClubSupporterSubscription) CCBillErrorText() *string {
	return c.ccbillErrorText
}

func (c *AccountClubSupporterSubscription) CCBillErrorCode() *string {
	return c.ccbillErrorCode
}

func (c *AccountClubSupporterSubscription) BillingFailureNextRetryDate() *time.Time {
	return c.billingFailureNextRetryDate
}

func (c *AccountClubSupporterSubscription) GetSupport() *CCBillSupport {
	return &CCBillSupport{
		ccbillSubscriptionId: *c.ccbillSubscriptionId,
		email:                c.paymentMethod.billingContact.email,
	}
}

func (c *AccountClubSupporterSubscription) IsCCBill() bool {
	return c.ccbillSubscriptionId != nil
}

func (c *AccountClubSupporterSubscription) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	return nil
}

func (c *AccountClubSupporterSubscription) UpdateCCBillPaymentError(failedAt time.Time, errorText, errorCode string, nextRetryDate time.Time) error {
	c.failedAt = &failedAt
	c.ccbillErrorText = &errorText
	c.ccbillErrorCode = &errorCode
	c.billingFailureNextRetryDate = &nextRetryDate
	return nil
}

func (c *AccountClubSupporterSubscription) MarkCancelled(cancelledAt time.Time) error {
	c.cancelledAt = &cancelledAt
	c.status = Cancelled
	return nil
}

func (c *AccountClubSupporterSubscription) MarkExpired(expiredAt time.Time) error {
	c.expiredAt = &expiredAt
	c.status = Expired
	return nil
}

func (c *AccountClubSupporterSubscription) Cancel(cancellationReason *CancellationReason) error {

	id := cancellationReason.ID()
	c.cancellationReasonId = &id

	return c.MarkCancelled(time.Now())
}

func (c *AccountClubSupporterSubscription) RequestCancel(requester *principal.Principal, cancellationReason *CancellationReason) error {

	if !requester.IsStaff() {
		if err := requester.BelongsToAccount(c.accountId); err != nil {
			return err
		}
	}

	return c.Cancel(cancellationReason)
}

func (c *AccountClubSupporterSubscription) RequestExtend(requester *principal.Principal, days int) error {
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	c.nextBillingDate = c.nextBillingDate.Add(time.Hour * 24 * time.Duration(days))

	return nil
}

func (c *AccountClubSupporterSubscription) UpdateBillingDate(nextBillingDate time.Time) error {
	c.lastBillingDate = c.nextBillingDate
	c.nextBillingDate = nextBillingDate
	c.failedAt = nil
	c.ccbillErrorText = nil
	c.ccbillErrorCode = nil
	c.billingFailureNextRetryDate = nil
	return nil
}

func (c *AccountClubSupporterSubscription) MakeReactivated(nextBillingDate time.Time) error {
	c.cancelledAt = nil
	c.status = Active
	c.nextBillingDate = nextBillingDate
	return nil
}

func (c *AccountClubSupporterSubscription) CanView(requester *principal.Principal) error {
	return CanViewAccountClubSupporterSubscription(requester, &c.accountId, nil)
}

func UnmarshalAccountClubSupporterSubscriptionFromDatabase(id, accountId, clubId, status string,
	supporterSince, lastBillingDate, nextBillingDate time.Time, billingAmount uint64, billingCurrency string, paymentMethod *PaymentMethod,
	ccbillSubscriptionId *string, cancelledAt *time.Time, createdAt time.Time, updatedAt time.Time, cancellationReasonId *string, expiredAt *time.Time,
	failedAt *time.Time, ccbillErrorText, ccbillErrorCode *string, billingFailureNextRetryDate *time.Time,
) *AccountClubSupporterSubscription {
	st, _ := SupportStatusFromString(status)
	cr, _ := money.CurrencyFromString(billingCurrency)
	return &AccountClubSupporterSubscription{
		id:                          id,
		accountId:                   accountId,
		clubId:                      clubId,
		status:                      st,
		createdAt:                   createdAt,
		cancelledAt:                 cancelledAt,
		supporterSince:              supporterSince,
		lastBillingDate:             lastBillingDate,
		nextBillingDate:             nextBillingDate,
		billingAmount:               billingAmount,
		billingCurrency:             cr,
		paymentMethod:               paymentMethod,
		ccbillSubscriptionId:        ccbillSubscriptionId,
		updatedAt:                   updatedAt,
		expiredAt:                   expiredAt,
		cancellationReasonId:        cancellationReasonId,
		failedAt:                    failedAt,
		ccbillErrorText:             ccbillErrorText,
		ccbillErrorCode:             ccbillErrorCode,
		billingFailureNextRetryDate: billingFailureNextRetryDate,
	}
}

func CanViewAccountClubSupporterSubscription(requester *principal.Principal, accountId, clubId *string) error {
	if requester.IsStaff() {
		return nil
	}

	if accountId == nil && clubId == nil {
		return principal.ErrNotAuthorized
	}

	if accountId != nil {
		if err := requester.BelongsToAccount(*accountId); err != nil {
			return err
		}

		return nil
	}

	if clubId != nil {
		if !requester.IsStaff() {
			return principal.ErrNotAuthorized
		}
	}

	return nil
}

func CanCancelActiveSubscriptionsForClub(requester *principal.Principal) error {
	if requester.IsStaff() {
		return nil
	}

	return principal.ErrNotAuthorized
}
