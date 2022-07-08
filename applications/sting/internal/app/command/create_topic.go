package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateTopic struct {
	Principal   *principal.Principal
	Slug        string
	Title       string
	Description string
	Weight      int
}

type CreateTopicHandler struct {
	pr post.Repository
}

func NewCreateTopicHandler(pr post.Repository) CreateTopicHandler {
	return CreateTopicHandler{pr: pr}
}

func (h CreateTopicHandler) Handle(ctx context.Context, cmd CreateTopic) (*post.Topic, error) {

	topic, err := post.NewTopic(cmd.Principal, cmd.Slug, cmd.Title, cmd.Description, cmd.Weight)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateTopic(ctx, cmd.Principal, topic); err != nil {
		return nil, err
	}

	return topic, nil
}
