package ccbill

import "time"

type SubscriptionStatus struct {
	cancelDate            time.Time
	chargebacksIssued     int
	expirationDate        time.Time
	recurringSubscription int
	signupDate            time.Time
	refundsIssued         int
	subscriptionStatus    int
	timesRebilled         int
	voidsIssued           int
}

func UnmarshalSubscriptionStatusFromDatabase(cancelDate string, chargebacksIssued int, expirationDate string, recurringSubscription, refundsIssued int, signupDate string, subscriptionStatus, timesRebilled, voidsIssued int) *SubscriptionStatus {
	return &SubscriptionStatus{
		cancelDate:            time.Time{},
		chargebacksIssued:     0,
		expirationDate:        time.Time{},
		recurringSubscription: 0,
		signupDate:            time.Time{},
		refundsIssued:         0,
		subscriptionStatus:    0,
		timesRebilled:         0,
		voidsIssued:           0,
	}
}
