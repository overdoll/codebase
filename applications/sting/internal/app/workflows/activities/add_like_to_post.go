package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) AddLikeToPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePostLikesOperator(ctx, postId, func(pending *post.Post) error {
		return pending.AddLike()
	})

	if err != nil {
		return err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	// the UpdatePostLikes operator will also update likes for each character, category, etc...
	// so we re-index them as well
	for _, cat := range pendingPost.Categories() {
		if err := h.pi.IndexCategory(ctx, cat); err != nil {
			return err
		}
	}

	for _, char := range pendingPost.Characters() {
		if err := h.pi.IndexCharacter(ctx, char); err != nil {
			return err
		}
	}

	if err := h.pi.IndexAudience(ctx, pendingPost.Audience()); err != nil {
		return err
	}

	return nil
}
