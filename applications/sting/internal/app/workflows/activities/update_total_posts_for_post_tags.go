package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateTotalPostsForPostTagsInput struct {
	PostId string
}

func (h *Activities) UpdateTotalPostsForPostTags(ctx context.Context, input UpdateTotalPostsForPostTagsInput) error {

	pendingPost, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	if err := h.pi.RefreshPostIndex(ctx); err != nil {
		return err
	}

	for _, cat := range pendingPost.CategoryIds() {

		newCat, err := h.pr.UpdateCategoryTotalPostsOperator(ctx, cat, func(category *post.Category) error {
			totalPosts, err := h.pi.GetTotalPostsForCategoryOperator(ctx, category)

			if err != nil {
				return err
			}

			return category.UpdateTotalPosts(totalPosts)
		})

		if err != nil {
			return err
		}

		if err := h.pi.IndexCategory(ctx, newCat); err != nil {
			return err
		}
	}

	updatedSeries := make(map[string]bool)

	for _, char := range pendingPost.CharacterIds() {

		newChar, err := h.pr.UpdateCharacterTotalPostsOperator(ctx, char, func(character *post.Character) error {

			totalPosts, err := h.pi.GetTotalPostsForCharacterOperator(ctx, character)

			if err != nil {
				return err
			}

			return character.UpdateTotalPosts(totalPosts)
		})

		if err != nil {
			return err
		}

		if err := h.pi.IndexCharacter(ctx, newChar); err != nil {
			return err
		}

		if _, ok := updatedSeries[newChar.Series().ID()]; !ok {

			newSeries, err := h.pr.UpdateSeriesTotalPostsOperator(ctx, newChar.Series().ID(), func(series *post.Series) error {

				totalPosts, err := h.pi.GetTotalPostsForSeriesOperator(ctx, series)

				if err != nil {
					return err
				}

				return series.UpdateTotalPosts(totalPosts)
			})

			if err != nil {
				return err
			}

			if err := h.pi.IndexSeries(ctx, newSeries); err != nil {
				return err
			}

			updatedSeries[newSeries.ID()] = true
		}
	}

	newAud, err := h.pr.UpdateAudienceTotalPostsOperator(ctx, *pendingPost.AudienceId(), func(audience *post.Audience) error {

		totalPosts, err := h.pi.GetTotalPostsForAudienceOperator(ctx, audience)

		if err != nil {
			return err
		}

		return audience.UpdateTotalPosts(totalPosts)
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexAudience(ctx, newAud); err != nil {
		return err
	}

	return nil
}
