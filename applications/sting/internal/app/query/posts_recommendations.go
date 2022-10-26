package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/paging"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostsRecommendations struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type PostsRecommendationsHandler struct {
	ppr curation.Repository
	pr  post.Repository
}

func NewPostsRecommendationsHandler(ppr curation.Repository, pr post.Repository) PostsRecommendationsHandler {
	return PostsRecommendationsHandler{ppr: ppr, pr: pr}
}

func (h PostsRecommendationsHandler) Handle(ctx context.Context, query PostsRecommendations) ([]*post.Post, error) {

	var audienceIDs []string

	// non-authenticated accounts can visit this endpoint
	if query.Principal != nil {
		personalProfile, err := h.ppr.GetProfileByAccountId(ctx, query.Principal, query.Principal.AccountId())

		if err != nil {
			return nil, err
		}

		audienceIDs = personalProfile.AudienceIds()
	}

	filters, err := post.NewPostFeed(audienceIDs, nil, nil)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.PostsFeed(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
