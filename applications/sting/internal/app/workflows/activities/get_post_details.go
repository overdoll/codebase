package activities

import (
	"context"
)

type GetPostDetailsInput struct {
	PostId string
}

type GetPostDetailsPayload struct {
	ResourceIds []string
}

func (h *Activities) GetPostDetails(ctx context.Context, input GetPostDetailsInput) (*GetPostDetailsPayload, error) {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return nil, err
	}

	var resourceIds []string

	for _, content := range pst.Content() {
		resourceIds = append(resourceIds, content.Resource().ID())
	}

	return &GetPostDetailsPayload{ResourceIds: resourceIds}, nil
}
