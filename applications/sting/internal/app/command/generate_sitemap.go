package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
)

type GenerateSitemap struct {
	Schedule string
}

type GenerateSitemapHandler struct {
	event event.Repository
}

func NewGenerateSitemapHandler(event event.Repository) GenerateSitemapHandler {
	return GenerateSitemapHandler{event: event}
}

func (h GenerateSitemapHandler) Handle(ctx context.Context, cmd GenerateSitemap) error {
	return h.event.GenerateSitemap(ctx, cmd.Schedule)
}
