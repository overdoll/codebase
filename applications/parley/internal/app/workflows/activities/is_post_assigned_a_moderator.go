package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
)

type IsPostAssignedAModeratorInput struct {
	PostId string
}

func (h *Activities) IsPostAssignedAModerator(ctx context.Context, input IsPostAssignedAModeratorInput) (bool, error) {

	_, err := h.mr.GetPostModeratorByPostIdOperator(ctx, input.PostId)

	if err != nil {

		if err == moderator.ErrPostModeratorNotFound {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
