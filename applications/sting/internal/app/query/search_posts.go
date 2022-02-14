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

	SupporterOnlyStatus []string
	State               *string

	SortBy string

	ShowSuspendedClubs bool
}

type SearchPostsHandler struct {
	pr     post.Repository
	pi     post.IndexRepository
	stella StellaService
}

func NewSearchPostsHandler(pr post.Repository, pi post.IndexRepository, stella StellaService) SearchPostsHandler {
	return SearchPostsHandler{pr: pr, pi: pi, stella: stella}
}

func (h SearchPostsHandler) Handle(ctx context.Context, query SearchPosts) ([]*post.Post, error) {

	var audienceIds []string
	var err error

	if len(query.AudienceSlugs) > 0 {
		audienceIds, err = h.pr.GetAudienceIdsFromSlugs(ctx, query.AudienceSlugs)

		if err != nil {
			return nil, err
		}
	}

	var categoryIds []string

	if len(query.CategorySlugs) > 0 {
		categoryIds, err = h.pr.GetCategoryIdsFromSlugs(ctx, query.CategorySlugs)

		if err != nil {
			return nil, err
		}
	}

	var seriesIds []string
	var characterIds []string

	if len(query.SeriesSlugs) > 0 {

		seriesIds, err = h.pr.GetSeriesIdsFromSlugs(ctx, query.SeriesSlugs)

		if err != nil {
			return nil, err
		}

		if len(query.CharacterSlugs) > 0 {

			characterIds, err = h.pr.GetCharacterIdsFromSlugs(ctx, query.SeriesSlugs, seriesIds)

			if err != nil {
				return nil, err
			}
		}
	}

	var suspendedClubIds []string

	if !query.ShowSuspendedClubs {
		suspendedClubIds, err = h.stella.GetSuspendedClubs(ctx)

		if err != nil {
			return nil, err
		}
	}

	filters, err := post.NewPostFilters(
		query.SortBy,
		query.State,
		query.ModeratorId,
		query.ContributorId,
		query.SupporterOnlyStatus,
		query.ClubIds,
		audienceIds,
		categoryIds,
		characterIds,
		seriesIds,
		suspendedClubIds,
	)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
