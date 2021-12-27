package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostClub struct {
	Principal *principal.Principal

	PostId string
	ClubId string
}

type UpdatePostClubHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdatePostClubHandler(pr post.Repository, pi post.IndexRepository) UpdatePostClubHandler {
	return UpdatePostClubHandler{pr: pr, pi: pi}
}

func (h UpdatePostClubHandler) Handle(ctx context.Context, cmd UpdatePostClub) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostClub(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		brand, err := h.pr.GetClubById(ctx, cmd.Principal, cmd.ClubId)

		if err != nil {
			return err
		}

		return post.UpdateClubRequest(cmd.Principal, brand)
	})

	if err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
