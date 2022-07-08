package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type TopicBySlug struct {
	Principal *principal.Principal
	Slug      string
}

type TopicBySlugHandler struct {
	pr post.Repository
}

func NewTopicBySlugHandler(pr post.Repository) TopicBySlugHandler {
	return TopicBySlugHandler{pr: pr}
}

func (h TopicBySlugHandler) Handle(ctx context.Context, query TopicBySlug) (*post.Topic, error) {

	result, err := h.pr.GetTopicBySlug(ctx, query.Slug)

	if err != nil {
		return nil, err
	}

	return result, nil
}
