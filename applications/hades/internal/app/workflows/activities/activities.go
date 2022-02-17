package activities

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type Activities struct {
	billing billing.Repository
	ccbill  ccbill.Repository
	stella  command.StellaService
}

func NewActivitiesHandler(billing billing.Repository, ccbill ccbill.Repository, stella command.StellaService) *Activities {
	return &Activities{
		billing: billing,
		stella:  stella,
		ccbill:  ccbill,
	}
}
