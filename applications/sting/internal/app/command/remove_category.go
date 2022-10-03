package command

import (
	"context"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
)

type RemoveCategory struct {
	CategoryId string
}

type RemoveCategoryHandler struct {
	pr post.Repository
}

func NewRemoveCategoryHandler(pr post.Repository) RemoveCategoryHandler {
	return RemoveCategoryHandler{pr: pr}
}

func (h RemoveCategoryHandler) Handle(ctx context.Context, cmd RemoveCategory) error {

	category, err := h.pr.GetCategoryById(ctx, cmd.CategoryId)

	if err != nil {
		return err
	}

	if err := h.pr.ScanPosts(ctx, "", "", func(char *post.Post) error {

		var found bool

		for _, cat := range char.CategoryIds() {
			if cat == cmd.CategoryId {
				found = true
				break
			}
		}

		if !found {
			return nil
		}

		_, err = h.pr.UpdatePostCategoriesOperator(ctx, char.ID(), func(aud *post.Post) error {
			return aud.RemoveCategory(cmd.CategoryId)
		})

		if err != nil {
			return err
		}

		zap.S().Infow("removed category from post", zap.String("id", char.ID()))

		return nil
	}); err != nil {
		return err
	}

	// finally, delete our category
	return h.pr.DeleteCategory(ctx, category)
}
