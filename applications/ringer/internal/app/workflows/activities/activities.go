package activities

import (
	"overdoll/applications/ringer/internal/domain/opennode"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/applications/ringer/internal/domain/payout"
)

type Activities struct {
	pr  payment.Repository
	pi  payment.IndexRepository
	par payout.Repository
	or  opennode.Repository
}

func NewActivitiesHandler(pr payment.Repository, pi payment.IndexRepository, par payout.Repository) *Activities {
	return &Activities{
		pr:  pr,
		par: par,
		pi:  pi,
	}
}
