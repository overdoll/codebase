package activities

import (
	"overdoll/applications/stella/internal/domain/club"
)

type Activities struct {
	cr    club.Repository
	sting StingService
}

func NewActivitiesHandler(cr club.Repository, sting StingService) *Activities {
	return &Activities{cr: cr, sting: sting}
}
