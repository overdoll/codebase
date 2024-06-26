package activities

import (
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
)

type Activities struct {
	pr  post.Repository
	cr  club.Repository
	cur curation.Repository

	carrier CarrierService

	parley ParleyService
	loader LoaderService
	event  event.Repository
}

func NewActivitiesHandler(pr post.Repository, cr club.Repository, cur curation.Repository, event event.Repository, parley ParleyService, loader LoaderService, carrier CarrierService) *Activities {
	return &Activities{pr: pr, cur: cur, cr: cr, parley: parley, loader: loader, carrier: carrier, event: event}
}
