// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"strconv"
	"time"
)

type AccountClubSupporterSubscription interface {
	IsAccountClubSupporterSubscription()
}

type IAccountClubSupporterSubscription interface {
	IsIAccountClubSupporterSubscription()
}

type Account struct {
	// Club supporter subscriptions linked to this account.
	ClubSupporterSubscriptions *AccountClubSupporterSubscriptionConnection `json:"clubSupporterSubscriptions"`
	// Expired club supporter subscriptions linked to this account.
	ExpiredClubSupporterSubscriptions *ExpiredAccountClubSupporterSubscriptionConnection `json:"expiredClubSupporterSubscriptions"`
	// Saved payment methods linked to this account.
	SavedPaymentMethods *AccountSavedPaymentMethodConnection `json:"savedPaymentMethods"`
	// Total amount of transactions, excluding voids.
	TransactionsTotalCount int `json:"transactionsTotalCount"`
	// Total amount of payment transactions.
	TransactionsPaymentCount int `json:"transactionsPaymentCount"`
	// Total amount of refund transactions.
	TransactionsRefundCount int `json:"transactionsRefundCount"`
	// Total amount of chargeback transactions.
	TransactionsChargebackCount int `json:"transactionsChargebackCount"`
	// Transactions for this account.
	Transactions *AccountTransactionConnection `json:"transactions"`
	ID           relay.ID                      `json:"id"`
}

func (Account) IsEntity() {}

type AccountActiveClubSupporterSubscription struct {
	// An ID to uniquely identify this subscription.
	ID relay.ID `json:"id"`
	// A reference, used to look up this subscription.
	Reference string `json:"reference"`
	// The account linked to this subscription.
	Account *Account `json:"account"`
	// The club linked to this subscription.
	Club *Club `json:"club"`
	// Transactions for this account.
	Transactions *AccountTransactionConnection `json:"transactions"`
	// The billing amount.
	BillingAmount int `json:"billingAmount"`
	// The currency.
	BillingCurrency Currency `json:"billingCurrency"`
	// When the account first became a supporter.
	SupporterSince time.Time `json:"supporterSince"`
	// The last billing date for this subscription.
	LastBillingDate time.Time `json:"lastBillingDate"`
	// The next billing date for this subscription.
	NextBillingDate time.Time `json:"nextBillingDate"`
	// The payment method linked to this subscription.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The ccbill subscription.
	CcbillSubscription *CCBillSubscription `json:"ccbillSubscription"`
	// When this subscription was last updated.
	UpdatedAt time.Time `json:"updatedAt"`
	// If a subscription is failed to be billed, it will be updated with this error object.
	BillingError *AccountClubSupporterSubscriptionBillingError `json:"billingError"`
}

func (AccountActiveClubSupporterSubscription) IsAccountClubSupporterSubscription()  {}
func (AccountActiveClubSupporterSubscription) IsIAccountClubSupporterSubscription() {}
func (AccountActiveClubSupporterSubscription) IsNode()                              {}
func (AccountActiveClubSupporterSubscription) IsEntity()                            {}

type AccountCancelledClubSupporterSubscription struct {
	// An ID to uniquely identify this subscription.
	ID relay.ID `json:"id"`
	// A reference, used to look up this subscription.
	Reference string `json:"reference"`
	// The account linked to this subscription.
	Account *Account `json:"account"`
	// The club linked to this subscription.
	Club *Club `json:"club"`
	// Transactions for this account.
	Transactions *AccountTransactionConnection `json:"transactions"`
	// The billing amount.
	BillingAmount int `json:"billingAmount"`
	// The currency.
	BillingCurrency Currency `json:"billingCurrency"`
	// When the account first became a supporter.
	SupporterSince time.Time `json:"supporterSince"`
	// When this subscription was cancelled.
	CancelledAt time.Time `json:"cancelledAt"`
	// When this subscription will end.
	EndDate time.Time `json:"endDate"`
	// The payment method linked to this subscription.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The ccbill subscription.
	CcbillSubscription *CCBillSubscription `json:"ccbillSubscription"`
	// When this subscription was last updated.
	UpdatedAt time.Time `json:"updatedAt"`
	// If a subscription is failed to be billed, it will be updated with this error object.
	BillingError *AccountClubSupporterSubscriptionBillingError `json:"billingError"`
	// The reason this subscription was cancelled, if there is one.
	CancellationReason *CancellationReason `json:"cancellationReason"`
}

func (AccountCancelledClubSupporterSubscription) IsAccountClubSupporterSubscription()  {}
func (AccountCancelledClubSupporterSubscription) IsIAccountClubSupporterSubscription() {}
func (AccountCancelledClubSupporterSubscription) IsNode()                              {}
func (AccountCancelledClubSupporterSubscription) IsEntity()                            {}

type AccountClubSupporterSubscriptionBillingError struct {
	// When this subscription failed to bill.
	FailedAt time.Time `json:"failedAt"`
	// The error text from CCBill.
	CcbillErrorText *string `json:"ccbillErrorText"`
	// The error code from CCBill.
	CcbillErrorCode *string `json:"ccbillErrorCode"`
	// The decline error, parsed in a friendlier way.
	CcbillDeclineError *CCBillDeclineError `json:"ccbillDeclineError"`
	// The next date the billing will be retried.
	NextRetryDate time.Time `json:"nextRetryDate"`
}

// Connection of the account club supporter subscription
type AccountClubSupporterSubscriptionConnection struct {
	Edges    []*AccountClubSupporterSubscriptionEdge `json:"edges"`
	PageInfo *relay.PageInfo                         `json:"pageInfo"`
}

// Edge of the account club supporter subscriptions
type AccountClubSupporterSubscriptionEdge struct {
	Node   AccountClubSupporterSubscription `json:"node"`
	Cursor string                           `json:"cursor"`
}

type AccountExpiredClubSupporterSubscription struct {
	// An ID to uniquely identify this subscription.
	ID relay.ID `json:"id"`
	// A reference, used to look up this subscription.
	Reference string `json:"reference"`
	// The account linked to this subscription.
	Account *Account `json:"account"`
	// The club linked to this subscription.
	Club *Club `json:"club"`
	// Transactions for this account.
	Transactions *AccountTransactionConnection `json:"transactions"`
	// The billing amount.
	BillingAmount int `json:"billingAmount"`
	// The currency.
	BillingCurrency Currency `json:"billingCurrency"`
	// When the account first became a supporter.
	SupporterSince time.Time `json:"supporterSince"`
	// The ccbill subscription.
	CcbillSubscription *CCBillSubscription `json:"ccbillSubscription"`
	// When this subscription was last updated.
	UpdatedAt time.Time `json:"updatedAt"`
	// When this subscription expired.
	ExpiredAt time.Time `json:"expiredAt"`
	// If a subscription is failed to be billed, it will be updated with this error object.
	BillingError *AccountClubSupporterSubscriptionBillingError `json:"billingError"`
	// The reason this subscription was cancelled, if there is one.
	CancellationReason *CancellationReason `json:"cancellationReason"`
}

func (AccountExpiredClubSupporterSubscription) IsAccountClubSupporterSubscription()  {}
func (AccountExpiredClubSupporterSubscription) IsIAccountClubSupporterSubscription() {}
func (AccountExpiredClubSupporterSubscription) IsNode()                              {}
func (AccountExpiredClubSupporterSubscription) IsEntity()                            {}

type AccountSavedPaymentMethod struct {
	// An ID to uniquely identify this payment method.
	ID relay.ID `json:"id"`
	// The account linked to this saved payment method.
	Account *Account `json:"account"`
	// The payment method.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The ccbill subscription.
	CcbillSubscription *CCBillSubscription `json:"ccbillSubscription"`
	// When this payment method was last updated.
	UpdatedAt time.Time `json:"updatedAt"`
}

// Connection of the account saved payment method
type AccountSavedPaymentMethodConnection struct {
	Edges    []*AccountSavedPaymentMethodEdge `json:"edges"`
	PageInfo *relay.PageInfo                  `json:"pageInfo"`
}

// Edge of the account saved payment method
type AccountSavedPaymentMethodEdge struct {
	Node   *AccountSavedPaymentMethod `json:"node"`
	Cursor string                     `json:"cursor"`
}

// A transaction item.
//
// All transactions start off in the "PAYMENT" type.
//
// Once a transaction is refunded once, it turns into a REFUND transaction + an event is added.
//
// If a transaction is charged back, it turns into a CHARGEBACK transaction + an event is added.
//
// If a transaction is voided, it turns into a VOID transaction.
type AccountTransaction struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// A reference, used to look up this transaction.
	Reference string `json:"reference"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The events for this transaction.
	//
	// If the transaction was refunded, an event will show up with the refund amount.
	//
	// If the transaction was charged back, an event will show up with the chargeback amount.
	Events []*AccountTransactionEvent `json:"events"`
	// The amount voided.
	//
	// A positive integer representing the currency in the smallest currency unit.
	Amount int `json:"amount"`
	// The currency voided in.
	Currency Currency `json:"currency"`
	// When the billing occurred.
	BilledAtDate time.Time `json:"billedAtDate"`
	// The next billing date for this transaction, if its a subscription.
	NextBillingDate *time.Time `json:"nextBillingDate"`
	// The payment method linked to this transaction.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
	// A ccbill transaction, if this transaction originated from ccbill.
	CcbillTransaction *CCBillTransaction `json:"ccbillTransaction"`
	// The subscription linked to this transaction, if it's a club supporter subscription.
	ClubSupporterSubscription AccountClubSupporterSubscription `json:"clubSupporterSubscription"`
}

func (AccountTransaction) IsNode()   {}
func (AccountTransaction) IsEntity() {}

// Connection of the account transaction.
type AccountTransactionConnection struct {
	Edges    []*AccountTransactionEdge `json:"edges"`
	PageInfo *relay.PageInfo           `json:"pageInfo"`
}

// Edge of the the account transaction.
type AccountTransactionEdge struct {
	Node   *AccountTransaction `json:"node"`
	Cursor string              `json:"cursor"`
}

type AccountTransactionEvent struct {
	// An ID to uniquely identify account transaction.
	ID relay.ID `json:"id"`
	// The amount.
	Amount int `json:"amount"`
	// The currency.
	Currency Currency `json:"currency"`
	// The reason for this event.
	Reason string `json:"reason"`
	// When this event occurred.
	Timestamp time.Time `json:"timestamp"`
}

// Become club supporter with saved payment method.
type BecomeClubSupporterWithAccountSavedPaymentMethodInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
	// The chosen currency.
	Currency Currency `json:"currency"`
	// The chosen saved payment method.
	SavedPaymentMethodID relay.ID `json:"savedPaymentMethodId"`
}

// Payload for a new club supporter
type BecomeClubSupporterWithAccountSavedPaymentMethodPayload struct {
	// CCBill Transaction Token, if this was a ccbill transaction. Used to query more details about this transaction.
	CcbillTransactionToken *string `json:"ccbillTransactionToken"`
}

// Represents a billing address.
type BillingAddress struct {
	AddressLine1 string `json:"addressLine1"`
	City         string `json:"city"`
	State        string `json:"state"`
	Country      string `json:"country"`
	PostalCode   string `json:"postalCode"`
}

// Represents a billing contact.
type BillingContact struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phoneNumber"`
}

// The ccbill subscription details.
//
// When this object is present, this means that it can only be updated through CCBill support. https://support.ccbill.com/
//
// For example: active subscriptions' payment methods can only be updated through support, or any saved payment methods.
type CCBillSubscription struct {
	// The payment method belonging to this subscription.
	PaymentMethod string `json:"paymentMethod"`
	// The identifier for this subscription.
	CcbillSubscriptionID string `json:"ccbillSubscriptionId"`
	// The email belonging to this subscription.
	Email string `json:"email"`
	// A link to modify the subscription.
	Link graphql1.URI `json:"link"`
}

type CCBillSubscriptionDetails struct {
	// The ID of the subscription.
	ID relay.ID `json:"id"`
	// The status of the CCBill subscription.
	Status CCBillSubscriptionStatus `json:"status"`
	// Payment method linked to this CCBill subscription.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The club linked to this ccbill subscription, if there is one.
	Club *Club `json:"club"`
	// The account linked to this ccbill subscription.
	Account *Account `json:"account"`
	// Subscription details.
	SubscriptionInitialPrice   int      `json:"subscriptionInitialPrice"`
	SubscriptionRecurringPrice int      `json:"subscriptionRecurringPrice"`
	SubscriptionCurrency       Currency `json:"subscriptionCurrency"`
	// Billed details.
	BilledInitialPrice   int      `json:"billedInitialPrice"`
	BilledRecurringPrice int      `json:"billedRecurringPrice"`
	BilledCurrency       Currency `json:"billedCurrency"`
	// Accounting details.
	AccountingInitialPrice   int      `json:"accountingInitialPrice"`
	AccountingRecurringPrice int      `json:"accountingRecurringPrice"`
	AccountingCurrency       Currency `json:"accountingCurrency"`
	// Whether or not this is recurring, or a one-time charge.
	IsRecurring bool `json:"isRecurring"`
	// The amount of rebills that occurred.
	TimesRebilled int `json:"timesRebilled"`
	// The amount of chargebacks issued.
	ChargebacksIssued int `json:"chargebacksIssued"`
	// The amount of refunds issued.
	RefundsIssued int `json:"refundsIssued"`
	// The amount of voids issued.
	VoidsIssued int `json:"voidsIssued"`
	// The signup date.
	SignupDate time.Time `json:"signupDate"`
	// If this subscription was cancelled, the expiration date.
	ExpirationDate *time.Time `json:"expirationDate"`
	// If this subscription was cancelled, the date it occurred.
	CancelDate *time.Time `json:"cancelDate"`
	// When this subscription was updated last.
	UpdatedAt time.Time `json:"updatedAt"`
}

// Represents a CCBill transaction, which may or may not contain these fields.
type CCBillTransaction struct {
	CcbillSubscriptionID string  `json:"ccbillSubscriptionId"`
	CcbillTransactionID  *string `json:"ccbillTransactionId"`
}

type CCBillTransactionDetails struct {
	// An ID uniquely identifying this transaction.
	ID relay.ID `json:"id"`
	// Whether or not the transaction was approved.
	Approved bool `json:"approved"`
	// The error from CCBill, if the transaction was not approved.
	DeclineError *CCBillDeclineError `json:"declineError"`
	// The decline code from CCBill.
	DeclineCode *string `json:"declineCode"`
	// The decline text from CCBill.
	DeclineText *string `json:"declineText"`
	// If this transaction was approved, poll this field to until this is not null anymore.
	//
	// This signifies that the transaction has processed successfully (on our end),
	//
	// and the supporter benefits are now available.
	LinkedAccountClubSupporterSubscription AccountClubSupporterSubscription `json:"linkedAccountClubSupporterSubscription"`
}

// Cancel account club supporter subscription input.
type CancelAccountClubSupporterSubscriptionInput struct {
	// The chosen club supporter subscription id.
	ClubSupporterSubscriptionID relay.ID `json:"clubSupporterSubscriptionId"`
	// The cancellation reason for this subscription.
	CancellationReasonID relay.ID `json:"cancellationReasonId"`
}

// Payload for cancelling the account club supporter.
type CancelAccountClubSupporterSubscriptionPayload struct {
	// The new subscription.
	ClubSupporterSubscription AccountClubSupporterSubscription `json:"clubSupporterSubscription"`
}

// Cancellation reason.
type CancellationReason struct {
	// ID of the reason.
	ID relay.ID `json:"id"`
	// Reference of the reason. Should be used for single lookups.
	Reference string `json:"reference"`
	// The title for this reason.
	Title string `json:"title"`
	// All translations for this title.
	TitleTranslations []*Translation `json:"titleTranslations"`
	// If this reason is deprecated.
	Deprecated bool `json:"deprecated"`
}

func (CancellationReason) IsNode()   {}
func (CancellationReason) IsEntity() {}

// Connection of the reason
type CancellationReasonConnection struct {
	Edges    []*CancellationReasonEdge `json:"edges"`
	PageInfo *relay.PageInfo           `json:"pageInfo"`
}

// Edge of the reason
type CancellationReasonEdge struct {
	Node   *CancellationReason `json:"node"`
	Cursor string              `json:"cursor"`
}

// Represents a card.
type Card struct {
	// Last 4 digits of the card.
	Last4 string `json:"last4"`
	// The expiration date.
	Expiration string `json:"expiration"`
	// The type of card.
	Type CardType `json:"type"`
}

type Club struct {
	// A supporter subscription price for this club.
	SupporterSubscriptionPrice *LocalizedPricingPoint `json:"supporterSubscriptionPrice"`
	ID                         relay.ID               `json:"id"`
}

func (Club) IsEntity() {}

// Create a new cancellation reason input.
type CreateCancellationReasonInput struct {
	// The title.
	Title string `json:"title"`
}

// Updated cancellation reason.
type CreateCancellationReasonPayload struct {
	// The updated cancellation reason.
	CancellationReason *CancellationReason `json:"cancellationReason"`
}

// Delete an account saved payment method input.
type DeleteAccountSavedPaymentMethodInput struct {
	// The chosen saved payment method id.
	SavedPaymentMethodID relay.ID `json:"savedPaymentMethodId"`
}

// Payload for deleting an account saved payment method.
type DeleteAccountSavedPaymentMethodPayload struct {
	// The deleted saved payment method.
	DeletedAccountSavedPaymentMethodID relay.ID `json:"deletedAccountSavedPaymentMethodId"`
}

// An expired account club supporter subscription.
type ExpiredAccountClubSupporterSubscription struct {
	// An ID to uniquely identify this expired subscription.
	ID relay.ID `json:"id"`
	// The account linked to this subscription.
	Account *Account `json:"account"`
	// The club linked to this subscription.
	Club *Club `json:"club"`
	// When the account first became a supporter. Note that when subscribing next time, this date will be kept, but subtracted by the amount of days they were not a supporter, and normalized to the current date.
	SupporterSince time.Time `json:"supporterSince"`
	// Wen this subscription expired.
	ExpiredAt time.Time `json:"expiredAt"`
	// When this subscription was originally cancelled.
	CancelledAt time.Time `json:"cancelledAt"`
}

// Connection of the expired account club supporter subscription
type ExpiredAccountClubSupporterSubscriptionConnection struct {
	Edges    []*ExpiredAccountClubSupporterSubscriptionEdge `json:"edges"`
	PageInfo *relay.PageInfo                                `json:"pageInfo"`
}

// Edge of the expired account club supporter subscriptions
type ExpiredAccountClubSupporterSubscriptionEdge struct {
	Node   *ExpiredAccountClubSupporterSubscription `json:"node"`
	Cursor string                                   `json:"cursor"`
}

// Extend account club supporter subscription input.
type ExtendAccountClubSupporterSubscriptionInput struct {
	// The chosen club supporter subscription id.
	ClubSupporterSubscriptionID relay.ID `json:"clubSupporterSubscriptionId"`
	// The amount of days to extend it for.
	Days int `json:"days"`
}

// Payload for extending the account club supporter.
type ExtendAccountClubSupporterSubscriptionPayload struct {
	// The new subscription.
	ClubSupporterSubscription AccountClubSupporterSubscription `json:"clubSupporterSubscription"`
}

// Generate ccbill club supporter payment link.
type GenerateCCBillClubSupporterPaymentLinkInput struct {
	// The chosen club ID.
	ClubID relay.ID `json:"clubId"`
	// The chosen currency.
	Currency Currency `json:"currency"`
	// Whether or not we want to save the payment details for later.
	SavePaymentDetailsForLater bool `json:"savePaymentDetailsForLater"`
}

// Payload for a new ccbill payment link
type GenerateCCBillClubSupporterPaymentLinkPayload struct {
	// The payment link to use.
	PaymentLink *graphql1.URI `json:"paymentLink"`
}

// Generate club supporter receipt input.
type GenerateClubSupporterPaymentReceiptFromAccountTransactionInput struct {
	// The id of the transaction.
	TransactionID relay.ID `json:"transactionId"`
}

// Payload for generating the receipt.
type GenerateClubSupporterPaymentReceiptFromAccountTransactionPayload struct {
	// The link to the receipt.
	Link *graphql1.URI `json:"link"`
}

// Generate club supporter receipt input.
type GenerateClubSupporterRefundReceiptFromAccountTransactionInput struct {
	// The id of the transaction.
	TransactionID relay.ID `json:"transactionId"`
	// The id of the transaction event, since we can have multiple refunds.
	TransactionEventID relay.ID `json:"transactionEventId"`
}

// Payload for generating the receipt.
type GenerateClubSupporterRefundReceiptFromAccountTransactionPayload struct {
	// The link to the receipt.
	Link *graphql1.URI `json:"link"`
}

// Generate a refund amount.
type GenerateRefundAmountForAccountTransactionInput struct {
	// The id of the transaction.
	AccountTransactionID relay.ID `json:"accountTransactionId"`
}

// Payload for generating the receipt.
type GenerateRefundAmountForAccountTransactionPayload struct {
	// The refund amount.
	RefundAmount *RefundAmount `json:"refundAmount"`
}

type Language struct {
	// BCP47 locale
	Locale string `json:"locale"`
	// Fully qualified name
	Name string `json:"name"`
}

// Type describing a localized pricing point.
type LocalizedPricingPoint struct {
	// Price for your current location + currency.
	LocalizedPrice *Price `json:"localizedPrice"`
	// All other prices in different currencies.
	Prices []*Price `json:"prices"`
}

// A payment method.
type PaymentMethod struct {
	// Card linked to this payment method.
	Card *Card `json:"card"`
	// Billing address of this card.
	BillingAddress *BillingAddress `json:"billingAddress"`
	// Billing contact of this card.
	BillingContact *BillingContact `json:"billingContact"`
}

// Type describing a price.
type Price struct {
	// The amount.
	//
	// A positive integer representing the currency in the smallest currency unit.
	Amount int `json:"amount"`
	// The currency the amount is represented in.
	Currency Currency `json:"currency"`
}

// Refund an account transaction.
type RefundAccountTransactionInput struct {
	// The id of the subscription.
	AccountTransactionID relay.ID `json:"accountTransactionId"`
	// The amount to refund.
	//
	// A positive integer representing the currency in the smallest currency unit.
	Amount int `json:"amount"`
}

// Payload for refunding an account transaction.
type RefundAccountTransactionPayload struct {
	// The updated account transaction.
	AccountTransaction *AccountTransaction `json:"accountTransaction"`
}

// A generated refund amount.
type RefundAmount struct {
	// A prorated refund amount, based on the first date and last date of billing / billing duration.
	//
	// A positive integer representing the currency in the smallest currency unit.
	ProratedAmount int `json:"proratedAmount"`
	// The maximum amount you can issue a refund for.
	//
	// A positive integer representing the currency in the smallest currency unit.
	MaximumAmount int `json:"maximumAmount"`
	// The currency.
	Currency Currency `json:"currency"`
}

type Translation struct {
	// The language linked to this translation.
	Language *Language `json:"language"`
	// The translation text.
	Text string `json:"text"`
}

// Update reason.
type UpdateCancellationReasonDeprecatedInput struct {
	// The cancellation reason to update.
	CancellationReasonID relay.ID `json:"cancellationReasonId"`
	// The deprecated status.
	Deprecated bool `json:"deprecated"`
}

// Updated reason.
type UpdateCancellationReasonDeprecatedPayload struct {
	// The updated reason.
	CancellationReason *CancellationReason `json:"cancellationReason"`
}

// Update cancellation reason.
type UpdateCancellationReasonTitleInput struct {
	// The reason to update.
	CancellationReasonID relay.ID `json:"cancellationReasonId"`
	// The title to update
	Title string `json:"title"`
	// The localization for this title.
	Locale string `json:"locale"`
}

// Updated reason.
type UpdateCancellationReasonTitlePayload struct {
	// The updated reason.
	CancellationReason *CancellationReason `json:"cancellationReason"`
}

type AccountClubSupporterSubscriptionStatus string

const (
	AccountClubSupporterSubscriptionStatusActive    AccountClubSupporterSubscriptionStatus = "ACTIVE"
	AccountClubSupporterSubscriptionStatusCancelled AccountClubSupporterSubscriptionStatus = "CANCELLED"
	AccountClubSupporterSubscriptionStatusExpired   AccountClubSupporterSubscriptionStatus = "EXPIRED"
)

var AllAccountClubSupporterSubscriptionStatus = []AccountClubSupporterSubscriptionStatus{
	AccountClubSupporterSubscriptionStatusActive,
	AccountClubSupporterSubscriptionStatusCancelled,
	AccountClubSupporterSubscriptionStatusExpired,
}

func (e AccountClubSupporterSubscriptionStatus) IsValid() bool {
	switch e {
	case AccountClubSupporterSubscriptionStatusActive, AccountClubSupporterSubscriptionStatusCancelled, AccountClubSupporterSubscriptionStatusExpired:
		return true
	}
	return false
}

func (e AccountClubSupporterSubscriptionStatus) String() string {
	return string(e)
}

func (e *AccountClubSupporterSubscriptionStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountClubSupporterSubscriptionStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountClubSupporterSubscriptionStatus", str)
	}
	return nil
}

func (e AccountClubSupporterSubscriptionStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type AccountTransactionType string

const (
	AccountTransactionTypePayment    AccountTransactionType = "PAYMENT"
	AccountTransactionTypeVoid       AccountTransactionType = "VOID"
	AccountTransactionTypeRefund     AccountTransactionType = "REFUND"
	AccountTransactionTypeChargeback AccountTransactionType = "CHARGEBACK"
)

var AllAccountTransactionType = []AccountTransactionType{
	AccountTransactionTypePayment,
	AccountTransactionTypeVoid,
	AccountTransactionTypeRefund,
	AccountTransactionTypeChargeback,
}

func (e AccountTransactionType) IsValid() bool {
	switch e {
	case AccountTransactionTypePayment, AccountTransactionTypeVoid, AccountTransactionTypeRefund, AccountTransactionTypeChargeback:
		return true
	}
	return false
}

func (e AccountTransactionType) String() string {
	return string(e)
}

func (e *AccountTransactionType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountTransactionType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountTransactionType", str)
	}
	return nil
}

func (e AccountTransactionType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type CCBillDeclineError string

const (
	CCBillDeclineErrorGeneralSystemError               CCBillDeclineError = "GENERAL_SYSTEM_ERROR"
	CCBillDeclineErrorTransactionDeclined              CCBillDeclineError = "TRANSACTION_DECLINED"
	CCBillDeclineErrorTransactionDeniedOrRefusedByBank CCBillDeclineError = "TRANSACTION_DENIED_OR_REFUSED_BY_BANK"
	CCBillDeclineErrorCardExpired                      CCBillDeclineError = "CARD_EXPIRED"
	CCBillDeclineErrorInsufficientFunds                CCBillDeclineError = "INSUFFICIENT_FUNDS"
	CCBillDeclineErrorRateLimitError                   CCBillDeclineError = "RATE_LIMIT_ERROR"
	CCBillDeclineErrorTransactionApprovalRequired      CCBillDeclineError = "TRANSACTION_APPROVAL_REQUIRED"
)

var AllCCBillDeclineError = []CCBillDeclineError{
	CCBillDeclineErrorGeneralSystemError,
	CCBillDeclineErrorTransactionDeclined,
	CCBillDeclineErrorTransactionDeniedOrRefusedByBank,
	CCBillDeclineErrorCardExpired,
	CCBillDeclineErrorInsufficientFunds,
	CCBillDeclineErrorRateLimitError,
	CCBillDeclineErrorTransactionApprovalRequired,
}

func (e CCBillDeclineError) IsValid() bool {
	switch e {
	case CCBillDeclineErrorGeneralSystemError, CCBillDeclineErrorTransactionDeclined, CCBillDeclineErrorTransactionDeniedOrRefusedByBank, CCBillDeclineErrorCardExpired, CCBillDeclineErrorInsufficientFunds, CCBillDeclineErrorRateLimitError, CCBillDeclineErrorTransactionApprovalRequired:
		return true
	}
	return false
}

func (e CCBillDeclineError) String() string {
	return string(e)
}

func (e *CCBillDeclineError) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CCBillDeclineError(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CCBillDeclineError", str)
	}
	return nil
}

func (e CCBillDeclineError) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type CCBillSubscriptionStatus string

const (
	// An inactive subscription, i.e. expired.
	CCBillSubscriptionStatusInactive CCBillSubscriptionStatus = "INACTIVE"
	// An active subscription that was cancelled, or a one-time charge.
	CCBillSubscriptionStatusActiveAndCancelled CCBillSubscriptionStatus = "ACTIVE_AND_CANCELLED"
	// An active subscription that is not cancelled.
	CCBillSubscriptionStatusActiveAndNotCancelled CCBillSubscriptionStatus = "ACTIVE_AND_NOT_CANCELLED"
)

var AllCCBillSubscriptionStatus = []CCBillSubscriptionStatus{
	CCBillSubscriptionStatusInactive,
	CCBillSubscriptionStatusActiveAndCancelled,
	CCBillSubscriptionStatusActiveAndNotCancelled,
}

func (e CCBillSubscriptionStatus) IsValid() bool {
	switch e {
	case CCBillSubscriptionStatusInactive, CCBillSubscriptionStatusActiveAndCancelled, CCBillSubscriptionStatusActiveAndNotCancelled:
		return true
	}
	return false
}

func (e CCBillSubscriptionStatus) String() string {
	return string(e)
}

func (e *CCBillSubscriptionStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CCBillSubscriptionStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CCBillSubscriptionStatus", str)
	}
	return nil
}

func (e CCBillSubscriptionStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type CardType string

const (
	CardTypeVisa       CardType = "VISA"
	CardTypeMastercard CardType = "MASTERCARD"
	CardTypeDiscover   CardType = "DISCOVER"
	CardTypeJcb        CardType = "JCB"
	CardTypeAmex       CardType = "AMEX"
	CardTypeOther      CardType = "OTHER"
)

var AllCardType = []CardType{
	CardTypeVisa,
	CardTypeMastercard,
	CardTypeDiscover,
	CardTypeJcb,
	CardTypeAmex,
	CardTypeOther,
}

func (e CardType) IsValid() bool {
	switch e {
	case CardTypeVisa, CardTypeMastercard, CardTypeDiscover, CardTypeJcb, CardTypeAmex, CardTypeOther:
		return true
	}
	return false
}

func (e CardType) String() string {
	return string(e)
}

func (e *CardType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CardType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CardType", str)
	}
	return nil
}

func (e CardType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type Currency string

const (
	CurrencyUsd Currency = "USD"
	CurrencyCad Currency = "CAD"
	CurrencyAud Currency = "AUD"
	CurrencyJpy Currency = "JPY"
	CurrencyGbp Currency = "GBP"
	CurrencyEur Currency = "EUR"
)

var AllCurrency = []Currency{
	CurrencyUsd,
	CurrencyCad,
	CurrencyAud,
	CurrencyJpy,
	CurrencyGbp,
	CurrencyEur,
}

func (e Currency) IsValid() bool {
	switch e {
	case CurrencyUsd, CurrencyCad, CurrencyAud, CurrencyJpy, CurrencyGbp, CurrencyEur:
		return true
	}
	return false
}

func (e Currency) String() string {
	return string(e)
}

func (e *Currency) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Currency(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Currency", str)
	}
	return nil
}

func (e Currency) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
