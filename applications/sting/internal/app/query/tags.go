package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type Tags struct {
	Cursor *paging.Cursor
	ClubId *string
}

type TagsHandler struct {
	pr post.Repository
}

func NewTagsHandler(pr post.Repository) TagsHandler {
	return TagsHandler{pr: pr}
}

func (h TagsHandler) Handle(ctx context.Context, query Tags) ([]interface{}, error) {
	return h.pr.Tags(ctx, query.Cursor, query.ClubId)
}
