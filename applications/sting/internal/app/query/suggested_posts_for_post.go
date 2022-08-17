package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SuggestedPostsForPost struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	PostId    string
}

type SuggestedPostsForPostHandler struct {
	pr  post.Repository
	ppr curation.Repository
}

func NewSuggestedPostsForPostHandler(pr post.Repository, ppr curation.Repository) SuggestedPostsForPostHandler {
	return SuggestedPostsForPostHandler{pr: pr, ppr: ppr}
}

func (h SuggestedPostsForPostHandler) Handle(ctx context.Context, query SuggestedPostsForPost) ([]*post.Post, error) {

	pst, err := h.pr.GetPostById(ctx, query.Principal, query.PostId)

	if err != nil {
		return nil, err
	}

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

	posts, err := h.pr.SuggestedPostsByPost(ctx, query.Principal, query.Cursor, pst, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
