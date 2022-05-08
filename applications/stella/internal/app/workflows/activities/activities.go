package activities

import (
	"overdoll/applications/stella/internal/domain/club"
)

type Activities struct {
	cr      club.Repository
	sting   StingService
	carrier CarrierService
}

func NewActivitiesHandler(cr club.Repository, sting StingService, carrier CarrierService) *Activities {
	return &Activities{cr: cr, sting: sting, carrier: carrier}
}
