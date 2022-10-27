package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
)

type UpdateTotalPostsForPostTagsInput struct {
	PostId string
}

func (h *Activities) UpdateTotalPostsForPostTags(ctx context.Context, input UpdateTotalPostsForPostTagsInput) error {

	pendingPost, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil
		}

		return err
	}

	if err := h.pr.RefreshPostIndex(ctx); err != nil {
		return err
	}

	for _, cat := range pendingPost.CategoryIds() {

		_, err := h.pr.UpdateCategoryTotalPostsOperator(ctx, cat, func(category *post.Category) error {
			totalPosts, err := h.pr.GetTotalPostsForCategoryOperator(ctx, category)

			if err != nil {
				return err
			}

			return category.UpdateTotalPosts(totalPosts)
		})

		if err != nil {
			return err
		}

	}

	updatedSeries := make(map[string]bool)

	for _, char := range pendingPost.CharacterIds() {

		newChar, err := h.pr.UpdateCharacterTotalPostsOperator(ctx, char, func(character *post.Character) error {

			totalPosts, err := h.pr.GetTotalPostsForCharacterOperator(ctx, character)

			if err != nil {
				return err
			}

			return character.UpdateTotalPosts(totalPosts)
		})

		if err != nil {
			return err
		}

		if newChar.Series() != nil {
			if _, ok := updatedSeries[newChar.Series().ID()]; !ok {

				newSeries, err := h.pr.UpdateSeriesTotalPostsOperator(ctx, newChar.Series().ID(), func(series *post.Series) error {

					totalPosts, err := h.pr.GetTotalPostsForSeriesOperator(ctx, series)

					if err != nil {
						return err
					}

					return series.UpdateTotalPosts(totalPosts)
				})

				if err != nil {
					return err
				}

				updatedSeries[newSeries.ID()] = true
			}
		}
	}

	_, err = h.pr.UpdateAudienceTotalPostsOperator(ctx, *pendingPost.AudienceId(), func(audience *post.Audience) error {

		totalPosts, err := h.pr.GetTotalPostsForAudienceOperator(ctx, audience)

		if err != nil {
			return err
		}

		return audience.UpdateTotalPosts(totalPosts)
	})

	if err != nil {
		return err
	}

	_, err = h.cr.UpdateClubTotalPostsCount(ctx, pendingPost.ClubId(), func(clb *club.Club) error {

		totalLikes, err := h.pr.GetTotalPostsForClubOperator(ctx, clb.ID())

		if err != nil {
			return err
		}

		return clb.UpdateTotalPosts(totalLikes)
	})

	if err != nil {
		return err
	}

	return nil
}
