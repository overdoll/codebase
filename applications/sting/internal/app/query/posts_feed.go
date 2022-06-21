package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/paging"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostsFeed struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type PostsFeedHandler struct {
	ppr curation.Repository
	pr  post.Repository
}

func NewPostsFeedHandler(ppr curation.Repository, pr post.Repository) PostsFeedHandler {
	return PostsFeedHandler{ppr: ppr, pr: pr}
}

func (h PostsFeedHandler) Handle(ctx context.Context, query PostsFeed) ([]*post.Post, error) {

	var audienceIDs []string
	var categoryIds []string

	// non-authenticated accounts can visit this endpoint
	if query.Principal != nil {
		personalProfile, err := h.ppr.GetProfileByAccountId(ctx, query.Principal, query.Principal.AccountId())

		if err != nil {
			return nil, err
		}

		audienceIDs = personalProfile.AudienceIds()
		categoryIds = personalProfile.CategoryIds()
	}

	filters, err := post.NewPostFeed(audienceIDs, categoryIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.PostsFeed(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
