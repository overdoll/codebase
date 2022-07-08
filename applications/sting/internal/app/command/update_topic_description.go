package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateTopicDescription struct {
	Principal   *principal.Principal
	TopicId     string
	Description string
	Locale      string
}

type UpdateTopicDescriptionHandler struct {
	pr post.Repository
}

func NewUpdateTopicDescriptionHandler(pr post.Repository) UpdateTopicDescriptionHandler {
	return UpdateTopicDescriptionHandler{pr: pr}
}

func (h UpdateTopicDescriptionHandler) Handle(ctx context.Context, cmd UpdateTopicDescription) (*post.Topic, error) {

	ser, err := h.pr.UpdateTopicDescription(ctx, cmd.Principal, cmd.TopicId, func(topic *post.Topic) error {
		return topic.UpdateDescription(cmd.Principal, cmd.Description, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return ser, nil
}
