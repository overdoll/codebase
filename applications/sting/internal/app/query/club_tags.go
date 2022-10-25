package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type ClubTags struct {
	Cursor *paging.Cursor
	ClubId string
}

type ClubTagsHandler struct {
	pr post.Repository
}

func NewClubTagsHandler(pr post.Repository) ClubTagsHandler {
	return ClubTagsHandler{pr: pr}
}

func (h ClubTagsHandler) Handle(ctx context.Context, query ClubTags) ([]interface{}, error) {
	return h.pr.ClubTags(ctx, query.Cursor, query.ClubId)
}
