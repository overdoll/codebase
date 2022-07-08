package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateCategory struct {
	Principal *principal.Principal
	Slug      string
	Title     string
	TopicId   *string
}

type CreateCategoryHandler struct {
	pr post.Repository
}

func NewCreateCategoryHandler(pr post.Repository) CreateCategoryHandler {
	return CreateCategoryHandler{pr: pr}
}

func (h CreateCategoryHandler) Handle(ctx context.Context, cmd CreateCategory) (*post.Category, error) {

	var topic *post.Topic
	var err error

	if cmd.TopicId != nil {
		topic, err = h.pr.GetTopicById(ctx, *cmd.TopicId)
		if err != nil {
			return nil, err
		}
	}

	cat, err := post.NewCategory(cmd.Principal, cmd.Slug, cmd.Title, topic)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateCategory(ctx, cmd.Principal, cat); err != nil {
		return nil, err
	}

	return cat, nil
}
