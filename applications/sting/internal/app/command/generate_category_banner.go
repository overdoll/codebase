package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"time"
)

type GenerateCategoryBanner struct {
	Principal *principal.Principal

	CategoryId string
	Duration   int64
}

type GenerateCategoryBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateCategoryBannerHandler(pr post.Repository, event event.Repository) GenerateCategoryBannerHandler {
	return GenerateCategoryBannerHandler{pr: pr, event: event}
}

func (h GenerateCategoryBannerHandler) Handle(ctx context.Context, cmd GenerateCategoryBanner) (*post.Category, error) {

	category, err := h.pr.GetCategoryById(ctx, cmd.CategoryId)

	if err != nil {
		return nil, err
	}

	if err := h.event.GenerateCategoryBanner(ctx, cmd.Principal, category, time.Duration(cmd.Duration)); err != nil {
		return nil, err
	}

	return category, nil
}
