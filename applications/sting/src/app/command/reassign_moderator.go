package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type ReassignModeratorHandler struct {
	pi post.IndexRepository
	pr post.Repository
}

func NewReassignModeratorHandler(pr post.Repository, pi post.IndexRepository) ReassignModeratorHandler {
	return ReassignModeratorHandler{pr: pr, pi: pi}
}

func (h ReassignModeratorHandler) Handle(ctx context.Context, oldId, newId string) (bool, error) {

	return true, nil
}
