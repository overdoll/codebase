package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type TopicsByIds struct {
	Ids []string
}

type TopicsByIdsHandler struct {
	pr post.Repository
}

func NewTopicsByIdsHandler(pr post.Repository) TopicsByIdsHandler {
	return TopicsByIdsHandler{pr: pr}
}

func (h TopicsByIdsHandler) Handle(ctx context.Context, query TopicsByIds) ([]*post.Topic, error) {

	result, err := h.pr.GetTopicsByIds(ctx, query.Ids)

	if err != nil {
		return nil, err
	}

	return result, nil
}
