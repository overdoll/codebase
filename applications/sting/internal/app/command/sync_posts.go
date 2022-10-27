package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
)

type SyncPosts struct {
	Schedule string
}

type SyncPostsHandler struct {
	event event.Repository
}

func NewSyncPostsHandler(event event.Repository) SyncPostsHandler {
	return SyncPostsHandler{event: event}
}

func (h SyncPostsHandler) Handle(ctx context.Context, cmd SyncPosts) error {
	return h.event.SyncPosts(ctx, cmd.Schedule)
}
