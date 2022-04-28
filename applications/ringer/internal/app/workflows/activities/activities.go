package activities

import (
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/paxum"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/applications/ringer/internal/domain/payout"
)

type Activities struct {
	pr     payment.Repository
	br     balance.Repository
	par    payout.Repository
	pxr    paxum.Repository
	dr     details.Repository
	stella StellaService
}

func NewActivitiesHandler(pr payment.Repository, par payout.Repository, br balance.Repository, dr details.Repository, pxr paxum.Repository, stella StellaService) *Activities {
	return &Activities{
		pr:     pr,
		par:    par,
		br:     br,
		dr:     dr,
		pxr:    pxr,
		stella: stella,
	}
}
