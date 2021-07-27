package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchPosts struct {
	Cursor        *paging.Cursor
	ModeratorId   *string
	ContributorId *string
	ArtistId      *string
	CategoryIds   []string
	CharacterIds  []string
	MediaIds      []string
}

type SearchPostsHandler struct {
	pr post.IndexRepository
}

func NewSearchPostsHandler(pr post.IndexRepository) SearchPostsHandler {
	return SearchPostsHandler{pr: pr}
}

func (h SearchPostsHandler) Handle(ctx context.Context, query SearchPosts) ([]*post.Post, error) {

	filters, err := post.NewPostFilters(query.ModeratorId, query.ContributorId, query.ArtistId, query.CategoryIds, query.CharacterIds, query.MediaIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SearchPosts(ctx, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
