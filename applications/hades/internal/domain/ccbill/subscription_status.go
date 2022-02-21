package ccbill

import "time"

type SubscriptionStatus struct {
	id                    string
	cancelDate            *time.Time
	chargebacksIssued     int
	expirationDate        *time.Time
	recurringSubscription bool
	signupDate            time.Time
	refundsIssued         int
	subscriptionStatus    SubscriptionStatusValue
	timesRebilled         int
	voidsIssued           int
}

func (s *SubscriptionStatus) Id() string {
	return s.id
}

func (s *SubscriptionStatus) CancelDate() *time.Time {
	return s.cancelDate
}

func (s *SubscriptionStatus) ChargebacksIssued() int {
	return s.chargebacksIssued
}

func (s *SubscriptionStatus) RecurringSubscription() bool {
	return s.recurringSubscription
}

func (s *SubscriptionStatus) ExpirationDate() *time.Time {
	return s.expirationDate
}

func (s *SubscriptionStatus) SignupDate() time.Time {
	return s.signupDate
}

func (s *SubscriptionStatus) RefundsIssued() int {
	return s.refundsIssued
}

func (s *SubscriptionStatus) SubscriptionStatus() SubscriptionStatusValue {
	return s.subscriptionStatus
}

func (s *SubscriptionStatus) TimesRebilled() int {
	return s.timesRebilled
}

func (s *SubscriptionStatus) VoidsIssued() int {
	return s.voidsIssued
}

func UnmarshalSubscriptionStatusFromDatabase(id string, cancelDate *time.Time, chargebacksIssued int, expirationDate *time.Time, recurringSubscription bool, refundsIssued int, signupDate time.Time, subscriptionStatus, timesRebilled, voidsIssued int) *SubscriptionStatus {

	sb, _ := SubscriptionStatusValueFromInt(subscriptionStatus)

	return &SubscriptionStatus{
		id:                    id,
		cancelDate:            cancelDate,
		chargebacksIssued:     chargebacksIssued,
		expirationDate:        expirationDate,
		recurringSubscription: recurringSubscription,
		signupDate:            signupDate,
		refundsIssued:         refundsIssued,
		subscriptionStatus:    sb,
		timesRebilled:         timesRebilled,
		voidsIssued:           voidsIssued,
	}
}
