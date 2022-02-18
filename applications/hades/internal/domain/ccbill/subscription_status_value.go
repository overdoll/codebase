package ccbill

import "errors"

type SubscriptionStatusValue struct {
	slug int
}

var (
	Unknown               = SubscriptionStatusValue{-1}
	Inactive              = SubscriptionStatusValue{0}
	ActiveAndCancelled    = SubscriptionStatusValue{1}
	ActiveAndNotCancelled = SubscriptionStatusValue{2}
)

func (r SubscriptionStatusValue) Int() int {
	return r.slug
}

func SubscriptionStatusValueFromInt(s int) (SubscriptionStatusValue, error) {
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
