package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) UpdateTotalPostsForPostTags(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.GetPostByIdOperator(ctx, postId)

	if err != nil {
		return err
	}

	if err := h.pi.RefreshPostIndex(ctx); err != nil {
		return err
	}

	for _, cat := range pendingPost.Categories() {

		newCat, err := h.pr.UpdateCategoryTotalPostsOperator(ctx, cat.ID(), func(category *post.Category) error {
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

	for _, char := range pendingPost.Characters() {

		newChar, err := h.pr.UpdateCharacterTotalPostsOperator(ctx, char.ID(), func(character *post.Character) error {

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

		if _, ok := updatedSeries[char.Series().ID()]; !ok {

			newSeries, err := h.pr.UpdateSeriesTotalPostsOperator(ctx, char.Series().ID(), func(series *post.Series) error {

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

	newAud, err := h.pr.UpdateAudienceTotalPostsOperator(ctx, pendingPost.Audience().ID(), func(audience *post.Audience) error {

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
