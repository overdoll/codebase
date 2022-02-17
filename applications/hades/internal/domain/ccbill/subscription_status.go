package ccbill

import "errors"

type SubscriptionStatus struct {
	slug int
}

var (
	Unknown               = SubscriptionStatus{-1}
	Inactive              = SubscriptionStatus{0}
	ActiveAndCancelled    = SubscriptionStatus{1}
	ActiveAndNotCancelled = SubscriptionStatus{2}
)

func (r SubscriptionStatus) Int() int {
	return r.slug
}

func SubscriptionStatusFromInt(s int) (SubscriptionStatus, error) {
	switch s {
	case Inactive.slug:
		return Inactive, nil
	case ActiveAndCancelled.slug:
		return ActiveAndCancelled, nil
	case ActiveAndNotCancelled.slug:
		return ActiveAndNotCancelled, nil
	}

	return Unknown, errors.New("unknown subscription status: " + string(1))
}
