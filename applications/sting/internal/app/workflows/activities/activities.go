package activities

import (
	"overdoll/applications/sting/internal/domain/post"
)

type Activities struct {
	pr post.Repository

	parley ParleyService
	loader LoaderService
}

func NewActivitiesHandler(pr post.Repository, parley ParleyService, loader LoaderService) *Activities {
	return &Activities{pr: pr, parley: parley, loader: loader}
}
