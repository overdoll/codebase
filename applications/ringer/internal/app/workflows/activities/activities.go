package activities

import "overdoll/applications/ringer/internal/domain/payment"

type Activities struct {
	pr payment.Repository
}

func NewActivitiesHandler(pr payment.Repository) *Activities {
	return &Activities{
		pr: pr,
	}
}
