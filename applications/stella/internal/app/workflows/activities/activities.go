package activities

import (
	"overdoll/applications/stella/internal/domain/club"
)

type Activities struct {
	cr club.Repository
}

func NewActivitiesHandler(cr club.Repository) *Activities {
	return &Activities{cr: cr}
}
