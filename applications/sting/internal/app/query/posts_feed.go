package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/personalization"
	"overdoll/libraries/paging"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type PostsFeed struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type PostsFeedHandler struct {
	ppr personalization.Repository
	pr  post.Repository
	pi  post.IndexRepository
}

func NewPostsFeedHandler(ppr personalization.Repository, pr post.Repository, pi post.IndexRepository) PostsFeedHandler {
	return PostsFeedHandler{pi: pi, ppr: ppr, pr: pr}
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

	// no audiences selected, select the "standard"
	if len(audienceIDs) == 0 {

		audiences, err := h.pr.GetAudiences(ctx, query.Principal)

		if err != nil {
			return nil, err
		}

		for _, aud := range audiences {
			if aud.IsStandard() {
				audienceIDs = append(audienceIDs, aud.ID())
			}
		}
	}

	filters, err := post.NewPostFeed(audienceIDs, categoryIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pi.SearchPosts(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
