package activities

import (
	"overdoll/applications/parley/internal/domain/moderator"
)

type Activities struct {
	mr moderator.Repository
}

func NewActivitiesHandler(mr moderator.Repository) *Activities {
	return &Activities{mr: mr}
}
