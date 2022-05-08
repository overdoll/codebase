package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostAudience struct {
	Principal *principal.Principal

	PostId     string
	AudienceId string
}

type UpdatePostAudienceHandler struct {
	pr post.Repository
}

func NewUpdatePostAudienceHandler(pr post.Repository) UpdatePostAudienceHandler {
	return UpdatePostAudienceHandler{pr: pr}
}

func (h UpdatePostAudienceHandler) Handle(ctx context.Context, cmd UpdatePostAudience) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostAudience(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		audience, err := h.pr.GetAudienceById(ctx, cmd.Principal, cmd.AudienceId)

		if err != nil {
			return err
		}

		return post.UpdateAudienceRequest(cmd.Principal, audience)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
