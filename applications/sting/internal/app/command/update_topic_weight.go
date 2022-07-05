package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateTopicWeight struct {
	Principal *principal.Principal
	TopicId   string
	Weight    int
}

type UpdateTopicWeightHandler struct {
	pr post.Repository
}

func NewUpdateTopicWeightHandler(pr post.Repository) UpdateTopicWeightHandler {
	return UpdateTopicWeightHandler{pr: pr}
}

func (h UpdateTopicWeightHandler) Handle(ctx context.Context, cmd UpdateTopicWeight) (*post.Topic, error) {

	ser, err := h.pr.UpdateTopicWeight(ctx, cmd.Principal, cmd.TopicId, func(topic *post.Topic) error {
		return topic.UpdateWeight(cmd.Principal, cmd.Weight)
	})

	if err != nil {
		return nil, err
	}

	return ser, nil
}
