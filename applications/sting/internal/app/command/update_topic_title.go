package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateTopicTitle struct {
	Principal *principal.Principal
	TopicId   string
	Title     string
	Locale    string
}

type UpdateTopicTitleHandler struct {
	pr post.Repository
}

func NewUpdateTopicTitleHandler(pr post.Repository) UpdateTopicTitleHandler {
	return UpdateTopicTitleHandler{pr: pr}
}

func (h UpdateTopicTitleHandler) Handle(ctx context.Context, cmd UpdateTopicTitle) (*post.Topic, error) {

	ser, err := h.pr.UpdateTopicTitle(ctx, cmd.Principal, cmd.TopicId, func(topic *post.Topic) error {
		return topic.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return ser, nil
}
