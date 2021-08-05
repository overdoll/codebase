package activities

import (
	"overdoll/applications/sting/internal/domain/content"
	"overdoll/applications/sting/internal/domain/post"
)

// Activities are setup differently from commands and queries since this is how temporal works under the hood
// and it's easier to run them this way
// however the concepts are the same
type Activities struct {
	pr     post.Repository
	pi     post.IndexRepository
	cr     content.Repository
	parley ParleyService
}

func NewActivitiesHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, parley ParleyService) *Activities {
	return &Activities{pr: pr, pi: pi, cr: cr, parley: parley}
}
