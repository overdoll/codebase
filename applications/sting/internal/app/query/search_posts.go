package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchPosts struct {
	Principal     *principal.Principal
	Cursor        *paging.Cursor
	ModeratorId   *string
	ContributorId *string
	ClubIds       []string

	AudienceSlugs  []string
	CategorySlugs  []string
	CharacterSlugs []string
	SeriesSlugs    []string

	State *string

	SortBy string
}

type SearchPostsHandler struct {
	pr post.IndexRepository
}

func NewSearchPostsHandler(pr post.IndexRepository) SearchPostsHandler {
	return SearchPostsHandler{pr: pr}
}

func (h SearchPostsHandler) Handle(ctx context.Context, query SearchPosts) ([]*post.Post, error) {

	filters, err := post.NewPostFilters(
		query.SortBy,
		query.State,
		query.ModeratorId,
		query.ContributorId,
		query.ClubIds,
		query.AudienceSlugs,
		query.CategorySlugs,
		query.CharacterSlugs,
		query.SeriesSlugs,
	)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
