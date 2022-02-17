package ccbill

import "time"

type Subscription struct {
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

func UnmarshalSubscriptionFromDatabase(cancelDate string, chargebacksIssued int, expirationDate string, recurringSubscription, refundsIssued int, signupDate string, subscriptionStatus, timesRebilled, voidsIssued int) *Subscription {
	return &Subscription{
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
