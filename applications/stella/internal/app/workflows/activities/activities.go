package activities

import (
	"overdoll/applications/stella/internal/domain/club"
)

type Activities struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewActivitiesHandler(cr club.Repository, ci club.IndexRepository) *Activities {
	return &Activities{cr: cr, ci: ci}
}
