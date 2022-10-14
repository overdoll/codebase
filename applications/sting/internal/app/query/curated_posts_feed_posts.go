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
	prr   post.Repository
	event event.Repository
}

func NewCuratedPostsFeedPostsHandler(pr curation.Repository, prr post.Repository, event event.Repository) CuratedPostsFeedPostsHandler {
	return CuratedPostsFeedPostsHandler{pr: pr, prr: prr, event: event}
}

func (h CuratedPostsFeedPostsHandler) Handle(ctx context.Context, query CuratedPostsFeedPosts) ([]*post.Post, error) {

	result, err := h.pr.GetCuratedPostsFeedData(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	// if new, generate and wait
	if result.GeneratedAt() == nil {
		if err := h.event.GenerateCuratedPostsFeed(ctx, result.AccountId()); err != nil {
			return nil, err
		}
		if err := h.event.WaitForCuratedPostsFeed(ctx, result.AccountId()); err != nil {
			return nil, err
		}
		result, err = h.pr.GetCuratedPostsFeedData(ctx, query.Principal, query.AccountId)
		if err != nil {
			return nil, err
		}
	}

	// create a job to generate the event
	if result.NextRegenerationTime() == nil && result.ViewedAt() == nil {

		// mark as viewed
		if err := result.WasViewed(query.Principal); err != nil {
			return nil, err
		}

		// update with next generation time
		if err := h.pr.UpdateCuratedPostsFeedData(ctx, query.Principal, result); err != nil {
			return nil, err
		}

		// generate curated posts feed
		if err := h.event.GenerateCuratedPostsFeed(ctx, result.AccountId()); err != nil {
			return nil, err
		}
	}

	posts, err := h.prr.GetCuratedPosts(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
