package activities

import (
	"context"
	"time"

	"overdoll/applications/sting/internal/domain/post"
)

type SubmitPostInput struct {
	PostId   string
	PostDate time.Time
}

type SubmitPostPayload struct {
	ResourceIds []string
}

func (h *Activities) SubmitPost(ctx context.Context, input SubmitPostInput) (*SubmitPostPayload, error) {

	pst, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.UpdatePostPostedDate(input.PostDate)
	})

	if err != nil {
		return nil, err
	}

	var resourceIds []string

	for _, content := range pst.Content() {
		// only grab the content that is not processed
		if !content.Media().IsProcessed() || content.Media().Failed() {
			resourceIds = append(resourceIds, content.Media().ID())
		}
	}

	return &SubmitPostPayload{ResourceIds: resourceIds}, nil
}
