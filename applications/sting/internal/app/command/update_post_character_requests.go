package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostCharacterRequests struct {
	Principal *principal.Principal

	PostId            string
	CharacterRequests []string
}

type UpdatePostCharacterRequestsHandler struct {
	pr post.Repository
}

func NewUpdatePostCharacterRequestsHandler(pr post.Repository) UpdatePostCharacterRequestsHandler {
	return UpdatePostCharacterRequestsHandler{pr: pr}
}

func (h UpdatePostCharacterRequestsHandler) Handle(ctx context.Context, cmd UpdatePostCharacterRequests) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostCharacterRequests(ctx, cmd.Principal, cmd.PostId, func(pst *post.Post) error {

		var chars []*post.CharacterRequest

		for _, request := range cmd.CharacterRequests {

			char, err := post.NewCharacterRequest(request)
			if err != nil {
				return err
			}

			chars = append(chars, char)
		}

		return pst.UpdateCharactersRequests(cmd.Principal, chars)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
