package activities

import (
	"overdoll/applications/loader/internal/domain/resource"
)

type Activities struct {
	rr resource.Repository
}

func NewActivitiesHandler(rr resource.Repository) *Activities {
	return &Activities{rr: rr}
}
