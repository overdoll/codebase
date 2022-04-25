package activities

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type Activities struct {
	billing billing.Repository
	bi      billing.IndexRepository
	fr      billing.FileRepository
	ccbill  ccbill.Repository
	stella  command.StellaService
	carrier command.CarrierService
	ringer  command.RingerService
}

func NewActivitiesHandler(billing billing.Repository, bi billing.IndexRepository, fr billing.FileRepository, ccbill ccbill.Repository, stella command.StellaService, carrier command.CarrierService, ringer command.RingerService) *Activities {
	return &Activities{
		billing: billing,
		stella:  stella,
		fr:      fr,
		bi:      bi,
		ccbill:  ccbill,
		carrier: carrier,
		ringer:  ringer,
	}
}
