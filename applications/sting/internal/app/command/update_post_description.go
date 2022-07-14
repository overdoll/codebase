package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdatePostDescription struct {
	Principal   *principal.Principal
	PostId      string
	Description string
	Locale      string
}

type UpdatePostDescriptionHandler struct {
	pr post.Repository
}

func NewUpdatePostDescriptionHandler(pr post.Repository) UpdatePostDescriptionHandler {
	return UpdatePostDescriptionHandler{pr: pr}
}

func (h UpdatePostDescriptionHandler) Handle(ctx context.Context, cmd UpdatePostDescription) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostDescription(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {
		return post.UpdateDescription(cmd.Principal, cmd.Description, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
