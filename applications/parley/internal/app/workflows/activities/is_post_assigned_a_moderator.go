package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
)

type IsPostAssignedAModerator struct {
	PostId string
}

func (h *Activities) IsPostAssignedAModerator(ctx context.Context, input IsPostAssignedAModerator) (bool, error) {

	_, err := h.mr.GetPostModeratorByPostIdOperator(ctx, input.PostId)

	if err != nil {

		if err == moderator.ErrPostModeratorNotFound {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
