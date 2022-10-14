package activities

import (
	"context"
)

type GenerateCuratedPostsFeedInput struct {
	AccountId string
}

func (h *Activities) GenerateCuratedPostsFeed(ctx context.Context, input GenerateCuratedPostsFeedInput) error {

	data, err := h.cur.GetCuratedPostsFeedDataOperator(ctx, input.AccountId)
	if err != nil {
		return err
	}

	profile, err := h.cur.GetProfileByAccountIdOperator(ctx, input.AccountId)
	if err != nil {
		return err
	}

	postIds, err := h.pr.GenerateCuratedPostIds(ctx, input.AccountId, profile.AudienceIds())
	if err != nil {
		return err
	}

	if err := data.MakeGenerated(); err != nil {
		return err
	}

	if err := h.cur.UpdateCuratedPostsFeedDataOperator(ctx, data); err != nil {
		return err
	}

	if err := h.cur.UpdateCuratedPostsFeedPostsOperator(ctx, input.AccountId, postIds); err != nil {
		return err
	}

	return nil
}
