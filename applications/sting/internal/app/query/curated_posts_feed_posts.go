package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type CuratedPostsFeedPosts struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type CuratedPostsFeedPostsHandler struct {
	pr    curation.Repository
	event event.Repository
}

func NewCuratedPostsFeedPostsHandler(pr curation.Repository, event event.Repository) CuratedPostsFeedPostsHandler {
	return CuratedPostsFeedPostsHandler{pr: pr, event: event}
}

func (h CuratedPostsFeedPostsHandler) Handle(ctx context.Context, query CuratedPostsFeedPosts) ([]*post.Post, error) {

	result, err := h.pr.GetCuratedPostsFeedData(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	// create a job to generate the event
	if (result.NextRegenerationTime() == nil && !result.WasViewedSinceGeneration()) || result.GeneratedAt() == nil {
		// generate curated posts feed
		if err := h.event.CreateCuratedPostsFeed(ctx, result.AccountId()); err != nil {
			return nil, err
		}
	}

	// wait for event
	if result.GeneratedAt() == nil {
		// wait for curated posts feed to be generated, if not yet generated
		if err := h.event.WaitForCuratedPostsFeed(ctx, result.AccountId()); err != nil {
			return nil, err
		}
	}

	posts, err := h.pr.GetCuratedPosts(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
