package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"time"
)

type GenerateCategoryBanner struct {
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

func (h GenerateCategoryBannerHandler) Handle(ctx context.Context, cmd GenerateCategoryBanner) error {

	category, err := h.pr.GetCategoryById(ctx, cmd.CategoryId)

	if err != nil {
		return err
	}

	if err := h.event.GenerateCategoryBanner(ctx, category, time.Duration(cmd.Duration)); err != nil {
		return err
	}

	return nil
}
