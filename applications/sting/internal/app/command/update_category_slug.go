package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateCategorySlug struct {
	CategoryId string
	Slug       string
	KeepOld    bool
}

type UpdateCategorySlugHandler struct {
	pr post.Repository
}

func NewUpdateCategorySlugHandler(pr post.Repository) UpdateCategorySlugHandler {
	return UpdateCategorySlugHandler{pr: pr}
}

func (h UpdateCategorySlugHandler) Handle(ctx context.Context, cmd UpdateCategorySlug) error {
	return nil
}
