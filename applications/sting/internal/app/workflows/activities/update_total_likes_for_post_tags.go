package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) UpdateTotalLikesForPostTags(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.GetPostByIdOperator(ctx, postId)

	if err != nil {
		return err
	}

	if err := h.pi.RefreshPostIndex(ctx); err != nil {
		return err
	}

	// the UpdatePostLikes operator will also update likes for each character, category, etc...
	// so we re-index them as well
	for _, cat := range pendingPost.Categories() {

		newCat, err := h.pr.UpdateCategoryTotalLikesOperator(ctx, cat.ID(), func(category *post.Category) error {
			totalLikes, err := h.pi.GetTotalLikesForCategoryOperator(ctx, category)

			if err != nil {
				return err
			}

			return category.UpdateTotalLikes(totalLikes)
		})

		if err != nil {
			return err
		}

		if err := h.pi.IndexCategory(ctx, newCat); err != nil {
			return err
		}
	}

	var updatedSeries map[string]bool

	for _, char := range pendingPost.Characters() {

		newChar, err := h.pr.UpdateCharacterTotalLikesOperator(ctx, char.ID(), func(character *post.Character) error {

			totalLikes, err := h.pi.GetTotalLikesForCharacterOperator(ctx, character)

			if err != nil {
				return err
			}

			return character.UpdateTotalLikes(totalLikes)
		})

		if err != nil {
			return err
		}

		if err := h.pi.IndexCharacter(ctx, newChar); err != nil {
			return err
		}

		if _, ok := updatedSeries[char.Series().ID()]; !ok {

			newSeries, err := h.pr.UpdateSeriesTotalLikesOperator(ctx, char.Series().ID(), func(series *post.Series) error {

				totalLikes, err := h.pi.GetTotalLikesForSeriesOperator(ctx, series)

				if err != nil {
					return err
				}

				return series.UpdateTotalLikes(totalLikes)
			})

			if err != nil {
				return err
			}

			if err := h.pi.IndexSeries(ctx, newSeries); err != nil {
				return err
			}

			updatedSeries[char.Series().ID()] = true
		}
	}

	newAud, err := h.pr.UpdateAudienceTotalLikesOperator(ctx, pendingPost.Audience().ID(), func(audience *post.Audience) error {

		totalLikes, err := h.pi.GetTotalLikesForAudienceOperator(ctx, audience)

		if err != nil {
			return err
		}

		return audience.UpdateTotalLikes(totalLikes)
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexAudience(ctx, newAud); err != nil {
		return err
	}

	return nil
}