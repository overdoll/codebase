package activities

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/applications/hades/internal/domain/metrics"
)

type Activities struct {
	billing billing.Repository
	mr      metrics.Repository
	fr      billing.FileRepository
	ccbill  ccbill.Repository
	sting   command.StingService
	carrier command.CarrierService
	ringer  command.RingerService
}

func NewActivitiesHandler(billing billing.Repository, mr metrics.Repository, fr billing.FileRepository, ccbill ccbill.Repository, sting command.StingService, carrier command.CarrierService, ringer command.RingerService) *Activities {
	return &Activities{
		billing: billing,
		mr:      mr,
		sting:   sting,
		fr:      fr,
		ccbill:  ccbill,
		carrier: carrier,
		ringer:  ringer,
	}
}
