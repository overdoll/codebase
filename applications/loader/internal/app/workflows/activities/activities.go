package activities

import (
	"overdoll/applications/loader/internal/domain/resource"
)

type Activities struct {
	rr resource.Repository
	fr resource.FileRepository
}

func NewActivitiesHandler(rr resource.Repository, fr resource.FileRepository) *Activities {
	return &Activities{rr: rr, fr: fr}
}
