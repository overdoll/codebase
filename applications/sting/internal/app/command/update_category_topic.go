package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateCategoryTopic struct {
	Principal  *principal.Principal
	CategoryId string
	TopicId    string
}

type UpdateCategoryTopicHandler struct {
	pr post.Repository
}

func NewUpdateCategoryTopicHandler(pr post.Repository) UpdateCategoryTopicHandler {
	return UpdateCategoryTopicHandler{pr: pr}
}

func (h UpdateCategoryTopicHandler) Handle(ctx context.Context, cmd UpdateCategoryTopic) (*post.Category, error) {

	cat, err := h.pr.UpdateCategoryTopic(ctx, cmd.Principal, cmd.CategoryId, func(category *post.Category) error {

		topic, err := h.pr.GetTopicById(ctx, cmd.TopicId)

		if err != nil {
			return err
		}

		return category.UpdateTopic(cmd.Principal, topic)
	})

	if err != nil {
		return nil, err
	}

	return cat, nil
}
