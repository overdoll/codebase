package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/applications/sting/internal/domain/post"
	"time"
)

type GenerateTopicBanner struct {
	TopicId  string
	Duration int64
}

type GenerateTopicBannerHandler struct {
	pr    post.Repository
	event event.Repository
}

func NewGenerateTopicBannerHandler(pr post.Repository, event event.Repository) GenerateTopicBannerHandler {
	return GenerateTopicBannerHandler{pr: pr, event: event}
}

func (h GenerateTopicBannerHandler) Handle(ctx context.Context, cmd GenerateTopicBanner) error {

	topic, err := h.pr.GetTopicById(ctx, cmd.TopicId)

	if err != nil {
		return err
	}

	if err := h.event.GenerateTopicBanner(ctx, topic, time.Duration(cmd.Duration)); err != nil {
		return err
	}

	return nil
}
