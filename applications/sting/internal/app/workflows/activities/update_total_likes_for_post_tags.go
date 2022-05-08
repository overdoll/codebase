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

	if err := h.pr.RefreshPostIndex(ctx); err != nil {
		return err
	}

	// the UpdatePostLikes operator will also update likes for each character, category, etc...
	// so we re-index them as well
	for _, cat := range pendingPost.CategoryIds() {

		_, err := h.pr.UpdateCategoryTotalLikesOperator(ctx, cat, func(category *post.Category) error {
			totalLikes, err := h.pr.GetTotalLikesForCategoryOperator(ctx, category)

			if err != nil {
				return err
			}

			return category.UpdateTotalLikes(totalLikes)
		})

		if err != nil {
			return err
		}

	}

	var updatedSeries map[string]bool

	for _, char := range pendingPost.CharacterIds() {

		newChar, err := h.pr.UpdateCharacterTotalLikesOperator(ctx, char, func(character *post.Character) error {

			totalLikes, err := h.pr.GetTotalLikesForCharacterOperator(ctx, character)

			if err != nil {
				return err
			}

			return character.UpdateTotalLikes(totalLikes)
		})

		if err != nil {
			return err
		}

		if _, ok := updatedSeries[newChar.Series().ID()]; !ok {

			_, err := h.pr.UpdateSeriesTotalLikesOperator(ctx, newChar.Series().ID(), func(series *post.Series) error {

				totalLikes, err := h.pr.GetTotalLikesForSeriesOperator(ctx, series)

				if err != nil {
					return err
				}

				return series.UpdateTotalLikes(totalLikes)
			})

			if err != nil {
				return err
			}

			updatedSeries[newChar.Series().ID()] = true
		}
	}

	_, err = h.pr.UpdateAudienceTotalLikesOperator(ctx, *pendingPost.AudienceId(), func(audience *post.Audience) error {

		totalLikes, err := h.pr.GetTotalLikesForAudienceOperator(ctx, audience)

		if err != nil {
			return err
		}

		return audience.UpdateTotalLikes(totalLikes)
	})

	if err != nil {
		return err
	}

	return nil
}
