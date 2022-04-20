package activities

import (
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/paxum"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/applications/ringer/internal/domain/payout"
)

type Activities struct {
	pr  payment.Repository
	pi  payment.IndexRepository
	br  balance.Repository
	pir payout.IndexRepository
	par payout.Repository
	pxr paxum.Repository
	dr  details.Repository
}

func NewActivitiesHandler(pr payment.Repository, pi payment.IndexRepository, par payout.Repository, pir payout.IndexRepository, br balance.Repository, dr details.Repository, pxr paxum.Repository) *Activities {
	return &Activities{
		pr:  pr,
		par: par,
		pi:  pi,
		br:  br,
		pir: pir,
		dr:  dr,
		pxr: pxr,
	}
}
