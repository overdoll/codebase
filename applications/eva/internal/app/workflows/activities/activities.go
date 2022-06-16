package activities

import (
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/session"
)

type Activities struct {
	ar      account.Repository
	sr      session.Repository
	hades   command.HadesService
	sting   command.StingService
	parley  command.ParleyService
	ringer  command.RingerService
	carrier command.CarrierService
}

func NewActivitiesHandler(ar account.Repository, sr session.Repository, hades command.HadesService, sting command.StingService, parley command.ParleyService, ringer command.RingerService, carrier command.CarrierService) *Activities {
	return &Activities{
		ar:      ar,
		sr:      sr,
		hades:   hades,
		sting:   sting,
		parley:  parley,
		ringer:  ringer,
		carrier: carrier,
	}
}
