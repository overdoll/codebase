package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateTopicSlug struct {
	TopicId string
	Slug    string
	KeepOld bool
}

type UpdateTopicSlugHandler struct {
	pr post.Repository
}

func NewUpdateTopicSlugHandler(pr post.Repository) UpdateTopicSlugHandler {
	return UpdateTopicSlugHandler{pr: pr}
}

func (h UpdateTopicSlugHandler) Handle(ctx context.Context, cmd UpdateTopicSlug) error {
	return nil
}
