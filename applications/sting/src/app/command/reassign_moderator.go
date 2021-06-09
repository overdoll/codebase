package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type ReassignModeratorActivityHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewReassignModeratorActivityHandler(pr post.Repository, pi post.IndexRepository) ReassignModeratorActivityHandler {
	return ReassignModeratorActivityHandler{pr: pr, pi: pi}
}

func (h ReassignModeratorActivityHandler) Handle(ctx context.Context, id string) error {

	return nil
}
