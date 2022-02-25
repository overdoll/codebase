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

type AccountTransactionHistory interface {
	IsAccountTransactionHistory()
}

type IAccountTransactionHistory interface {
	IsIAccountTransactionHistory()
}

type Account struct {
	// Club supporter subscriptions linked to this account.
	ClubSupporterSubscriptions *AccountClubSupporterSubscriptionConnection `json:"clubSupporterSubscriptions"`
	// Saved payment methods linked to this account.
	SavedPaymentMethods *AccountSavedPaymentMethodConnection `json:"savedPaymentMethods"`
	// Transaction history for this account.
	TransactionHistory *AccountTransactionHistoryConnection `json:"transactionHistory"`
	ID                 relay.ID                             `json:"id"`
}

func (Account) IsEntity() {}

// Occurs when a club supporter subscription is cancelled.
type AccountCancelledTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// If this is a ccbill transaction, the reason for the cancellation.
	CcbillReason *string `json:"ccbillReason"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountCancelledTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountCancelledTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a transaction is charged back.
type AccountChargebackTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The amount charged back.
	Amount float64 `json:"amount"`
	// The currency charged back in.
	Currency Currency `json:"currency"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// The payment method linked to this chargeback (only card will be available).
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountChargebackTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountChargebackTransactionHistory) IsIAccountTransactionHistory() {}

// An account club supporter subscription.
type AccountClubSupporterSubscription struct {
	// An ID to uniquely identify this subscription.
	ID relay.ID `json:"id"`
	// The account linked to this subscription.
	Account *Account `json:"account"`
	// The club linked to this subscription.
	Club *Club `json:"club"`
	// The status of this subscription.
	Status AccountClubSupporterSubscriptionStatus `json:"status"`
	// When the account first became a supporter.
	SupporterSince time.Time `json:"supporterSince"`
	// The last billing date for this subscription.
	LastBillingDate time.Time `json:"lastBillingDate"`
	// The next billing date for this subscription.
	NextBillingDate time.Time `json:"nextBillingDate"`
	// When this subscription was cancelled.
	CancelledAt *time.Time `json:"cancelledAt"`
	// The billing amount.
	BillingAmount float64 `json:"billingAmount"`
	// The currency.
	BillingCurrency Currency `json:"billingCurrency"`
	// The payment method linked to this subscription.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The ccbill subscription.
	CcbillSubscription *CCBillSubscription `json:"ccbillSubscription"`
	// When this subscription was last updated.
	UpdatedAt time.Time `json:"updatedAt"`
}

// Connection of the account club supporter subscription
type AccountClubSupporterSubscriptionConnection struct {
	Edges    []*AccountClubSupporterSubscriptionEdge `json:"edges"`
	PageInfo *relay.PageInfo                         `json:"pageInfo"`
}

// Edge of the account club supporter subscriptions
type AccountClubSupporterSubscriptionEdge struct {
	Node   *AccountClubSupporterSubscription `json:"node"`
	Cursor string                            `json:"cursor"`
}

// Occurs when a transaction subscription is expired (cancelled and the subscription end was reached).
type AccountExpiredTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountExpiredTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountExpiredTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a transaction subscription is failed to be billed.
type AccountFailedTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The next retry date for this transaction.
	NextRetryDate time.Time `json:"nextRetryDate"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// If this is a CCBill transaction, the error code and error text.
	CcbillErrorCode *string `json:"ccbillErrorCode"`
	CcbillErrorText *string `json:"ccbillErrorText"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountFailedTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountFailedTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a subscription is rebilled.
type AccountInvoiceTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The amount charged.
	Amount float64 `json:"amount"`
	// The currency charged in.
	Currency Currency `json:"currency"`
	// When the billing occurred.
	BilledAtDate time.Time `json:"billedAtDate"`
	// The next billing date for this subscription.
	NextBillingDate time.Time `json:"nextBillingDate"`
	// The payment method linked to this new transaction history.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountInvoiceTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountInvoiceTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a new transaction history is created (usually a new subscription).
type AccountNewTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The amount charged.
	Amount float64 `json:"amount"`
	// The currency charged in.
	Currency Currency `json:"currency"`
	// When the billing occurred.
	BilledAtDate time.Time `json:"billedAtDate"`
	// The next billing date for this subscription.
	NextBillingDate time.Time `json:"nextBillingDate"`
	// The payment method linked to this new transaction history.
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountNewTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountNewTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a transaction subscription is reactivated (after being cancelled).
type AccountReactivatedTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The next billing date for this subscription.
	NextBillingDate time.Time `json:"nextBillingDate"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountReactivatedTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountReactivatedTransactionHistory) IsIAccountTransactionHistory() {}

// Occurs when a transaction is refunded.
type AccountRefundTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The amount refunded.
	Amount float64 `json:"amount"`
	// The currency refunded in.
	Currency Currency `json:"currency"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// The payment method linked to this refund (only card will be available).
	PaymentMethod *PaymentMethod `json:"paymentMethod"`
	// If this is a ccbill transaction, the reason for the refund.
	CcbillReason *string `json:"ccbillReason"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountRefundTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountRefundTransactionHistory) IsIAccountTransactionHistory() {}

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
	Edges    []*AccountClubSupporterSubscriptionEdge `json:"edges"`
	PageInfo *relay.PageInfo                         `json:"pageInfo"`
}

// Edge of the account saved payment method
type AccountSavedPaymentMethodEdge struct {
	Node   *AccountSavedPaymentMethod `json:"node"`
	Cursor string                     `json:"cursor"`
}

// Connection of the account transaction history.
type AccountTransactionHistoryConnection struct {
	Edges    []*AccountClubSupporterSubscriptionEdge `json:"edges"`
	PageInfo *relay.PageInfo                         `json:"pageInfo"`
}

// Edge of the the account transaction history.
type AccountTransactionHistoryEdge struct {
	Node   AccountTransactionHistory `json:"node"`
	Cursor string                    `json:"cursor"`
}

// Occurs when a transaction is voided.
type AccountVoidTransactionHistory struct {
	// An ID to uniquely identify this transaction history.
	ID relay.ID `json:"id"`
	// The type of account transaction history, or what it belongs to.
	Type AccountTransactionType `json:"type"`
	// The account linked to this transaction history.
	Account *Account `json:"account"`
	// The amount voided.
	Amount float64 `json:"amount"`
	// The currency voided in.
	Currency Currency `json:"currency"`
	// The club that was supported as part of this transaction history.
	SupportedClub *Club `json:"supportedClub"`
	// If this is a ccbill transaction, the reason for the void.
	CcbillReason *string `json:"ccbillReason"`
	// A ccbill subscription transaction, if this transaction originated from ccbill.
	CcbillSubscriptionTransaction *CCBillSubscriptionTransaction `json:"ccbillSubscriptionTransaction"`
	// When this transaction occurred.
	Timestamp time.Time `json:"timestamp"`
}

func (AccountVoidTransactionHistory) IsAccountTransactionHistory()  {}
func (AccountVoidTransactionHistory) IsIAccountTransactionHistory() {}

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
	// The club that was supported.
	Club *Club `json:"club"`
	// The locker string which can be used to poll club supporter subscription status.
	Locker *string `json:"locker"`
	// Whether or not the transaction was approved.
	Approved *bool `json:"approved"`
	// The error from CCBill, if there is one.
	CcbillDeclineError *CCBillDeclineError `json:"ccbillDeclineError"`
}

// Represents a billing address.
type BillingAddress struct {
	AddressLine1 string `json:"AddressLine1"`
	City         string `json:"City"`
	State        string `json:"State"`
	Country      string `json:"Country"`
	PostalCode   string `json:"PostalCode"`
}

// Represents a billing contact.
type BillingContact struct {
	FirstName   string `json:"FirstName"`
	LastName    string `json:"LastName"`
	Email       string `json:"Email"`
	PhoneNumber string `json:"PhoneNumber"`
}

// The ccbill subscription details.
//
// When this object is present, this means that it can only be updated through CCBill support. https://support.ccbill.com/
//
// For example: active subscriptions' payment methods can only be updated through support, or any saved payment methods.
type CCBillSubscription struct {
	PaymentMethod        string `json:"paymentMethod"`
	CcbillSubscriptionID string `json:"ccbillSubscriptionId"`
	Email                string `json:"email"`
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
	SubscriptionInitialPrice   float64  `json:"subscriptionInitialPrice"`
	SubscriptionRecurringPrice float64  `json:"subscriptionRecurringPrice"`
	SubscriptionCurrency       Currency `json:"subscriptionCurrency"`
	// Billed details.
	BilledInitialPrice   float64  `json:"billedInitialPrice"`
	BilledRecurringPrice float64  `json:"billedRecurringPrice"`
	BilledCurrency       Currency `json:"billedCurrency"`
	// Accounting details.
	AccountingInitialPrice   float64  `json:"accountingInitialPrice"`
	AccountingRecurringPrice float64  `json:"accountingRecurringPrice"`
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
	SignupDate *time.Time `json:"signupDate"`
	// If this subscription was cancelled, the expiration date.
	ExpirationDate *time.Time `json:"expirationDate"`
	// If this subscription was cancelled, the date it occurred.
	CancelDate *time.Time `json:"cancelDate"`
	// When this subscription was updated last.
	UpdatedAt time.Time `json:"updatedAt"`
}

// Represents a CCBill transaction, which may or may not contain these fields.
type CCBillSubscriptionTransaction struct {
	CcbillTransactionID  *string `json:"ccbillTransactionId"`
	CcbillSubscriptionID string  `json:"ccbillSubscriptionId"`
}

// Cancel account club supporter subscription input.
type CancelAccountClubSupporterSubscriptionInput struct {
	// The chosen club supporter subscription id.
	ClubSupporterSubscriptionID relay.ID `json:"clubSupporterSubscriptionId"`
}

// Payload for cancelling the account club supporter.
type CancelAccountClubSupporterSubscriptionPayload struct {
	// The new subscription.
	ClubSupporterSubscription *AccountClubSupporterSubscription `json:"clubSupporterSubscription"`
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
	PaymentLink string `json:"paymentLink"`
}

// Generate club supporter receipt input.
type GenerateClubSupporterReceiptFromAccountTransactionHistoryInput struct {
	// The id of the transaction history.
	TransactionHistoryID relay.ID `json:"transactionHistoryId"`
}

// Payload for generating the receipt.
type GenerateClubSupporterReceiptFromAccountTransactionHistoryPayload struct {
	// The link to the receipt.
	Link *graphql1.URI `json:"link"`
}

// Generate a refund amount.
type GenerateRefundAmountForAccountClubSupporterSubscriptionInput struct {
	// The id of the subscription.
	ClubSupporterSubscriptionID relay.ID `json:"clubSupporterSubscriptionId"`
}

// Payload for generating the receipt.
type GenerateRefundAmountForAccountClubSupporterSubscriptionPayload struct {
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
	Amount   float64  `json:"amount"`
	Currency Currency `json:"currency"`
}

// A generated refund amount.
type RefundAmount struct {
	// A prorated refund amount, based on the first date and last date of billing / billing duration.
	ProratedAmount float64 `json:"proratedAmount"`
	// The maximum amount you can issue a refund for.
	MaximumAmount float64 `json:"maximumAmount"`
	// The currency.
	Currency Currency `json:"currency"`
}

type Translation struct {
	// The language linked to this translation.
	Language *Language `json:"language"`
	// The translation text.
	Text string `json:"text"`
}

// Void or refund account club supporter subscription.
type VoidOrRefundAccountClubSupporterSubscriptionInput struct {
	// The id of the subscription.
	ClubSupporterSubscriptionID relay.ID `json:"clubSupporterSubscriptionId"`
	// The amount to refund.
	Amount float64 `json:"amount"`
}

// Payload for voiding or refunding account club supporter subscription.
type VoidOrRefundAccountClubSupporterSubscriptionPayload struct {
	// Validation for voiding or refunding the subscription.
	Validation *VoidOrRefundAccountClubSupporterSubscriptionValidation `json:"validation"`
}

type AccountClubSupporterSubscriptionStatus string

const (
	AccountClubSupporterSubscriptionStatusActive    AccountClubSupporterSubscriptionStatus = "ACTIVE"
	AccountClubSupporterSubscriptionStatusCancelled AccountClubSupporterSubscriptionStatus = "CANCELLED"
)

var AllAccountClubSupporterSubscriptionStatus = []AccountClubSupporterSubscriptionStatus{
	AccountClubSupporterSubscriptionStatusActive,
	AccountClubSupporterSubscriptionStatusCancelled,
}

func (e AccountClubSupporterSubscriptionStatus) IsValid() bool {
	switch e {
	case AccountClubSupporterSubscriptionStatusActive, AccountClubSupporterSubscriptionStatusCancelled:
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
	AccountTransactionTypeClubSupporterSubscription AccountTransactionType = "CLUB_SUPPORTER_SUBSCRIPTION"
)

var AllAccountTransactionType = []AccountTransactionType{
	AccountTransactionTypeClubSupporterSubscription,
}

func (e AccountTransactionType) IsValid() bool {
	switch e {
	case AccountTransactionTypeClubSupporterSubscription:
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

type VoidOrRefundAccountClubSupporterSubscriptionValidation string

const (
	VoidOrRefundAccountClubSupporterSubscriptionValidationInvalidAmount VoidOrRefundAccountClubSupporterSubscriptionValidation = "INVALID_AMOUNT"
)

var AllVoidOrRefundAccountClubSupporterSubscriptionValidation = []VoidOrRefundAccountClubSupporterSubscriptionValidation{
	VoidOrRefundAccountClubSupporterSubscriptionValidationInvalidAmount,
}

func (e VoidOrRefundAccountClubSupporterSubscriptionValidation) IsValid() bool {
	switch e {
	case VoidOrRefundAccountClubSupporterSubscriptionValidationInvalidAmount:
		return true
	}
	return false
}

func (e VoidOrRefundAccountClubSupporterSubscriptionValidation) String() string {
	return string(e)
}

func (e *VoidOrRefundAccountClubSupporterSubscriptionValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = VoidOrRefundAccountClubSupporterSubscriptionValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid VoidOrRefundAccountClubSupporterSubscriptionValidation", str)
	}
	return nil
}

func (e VoidOrRefundAccountClubSupporterSubscriptionValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
