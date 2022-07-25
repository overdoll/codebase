package activities

import (
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/resource"
)

type Activities struct {
	rr       resource.Repository
	event    event.Repository
	callback CallbackService
}

func NewActivitiesHandler(rr resource.Repository, callback CallbackService) *Activities {
	return &Activities{rr: rr, callback: callback}
}
