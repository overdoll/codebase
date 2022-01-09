package activities

import (
	"overdoll/applications/sting/internal/domain/post"
)

type Activities struct {
	pr post.Repository
	pi post.IndexRepository

	parley ParleyService
	stella StellaService
	loader LoaderService
}

func NewActivitiesHandler(pr post.Repository, pi post.IndexRepository, parley ParleyService, stella StellaService, loader LoaderService) *Activities {
	return &Activities{pr: pr, pi: pi, parley: parley, stella: stella, loader: loader}
}
