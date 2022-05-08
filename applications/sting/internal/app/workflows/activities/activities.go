package activities

import (
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/post"
)

type Activities struct {
	pr post.Repository
	cr curation.Repository

	stella StellaService
	parley ParleyService
	loader LoaderService
}

func NewActivitiesHandler(pr post.Repository, cr curation.Repository, stella StellaService, parley ParleyService, loader LoaderService) *Activities {
	return &Activities{pr: pr, cr: cr, parley: parley, loader: loader, stella: stella}
}
