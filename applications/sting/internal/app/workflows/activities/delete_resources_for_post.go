package activities

import (
	"context"
)

type DeleteResourcesForPostInput struct {
	PostId      string
	ResourceIds []string
}

func (h *Activities) DeleteResourcesForPost(ctx context.Context, input DeleteResourcesForPostInput) error {
	return h.pr.DeleteResourcesForPost(ctx, input.PostId, input.ResourceIds)
}
