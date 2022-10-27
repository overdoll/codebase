package activities

import (
	"context"
)

func (h *Activities) SyncPosts(ctx context.Context) error {
	return h.pr.SyncPosts(ctx)
}
