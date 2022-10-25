package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
)

type ClubPostsView struct {
	ClubId string
}

type ClubPostsViewHandler struct {
	cr club.Repository
}

func NewClubPostsViewHandler(cr club.Repository) ClubPostsViewHandler {
	return ClubPostsViewHandler{cr: cr}
}

func (h ClubPostsViewHandler) Handle(ctx context.Context, query ClubPostsView) (club.PostsView, error) {
	return h.cr.PostsView(ctx, query.ClubId)
}
