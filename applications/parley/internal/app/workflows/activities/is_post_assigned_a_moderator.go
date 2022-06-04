package activities

import (
	"context"
	"overdoll/libraries/errors/apperror"
)

type IsPostAssignedAModeratorInput struct {
	PostId string
}

func (h *Activities) IsPostAssignedAModerator(ctx context.Context, input IsPostAssignedAModeratorInput) (bool, error) {

	_, err := h.mr.GetPostModeratorByPostIdOperator(ctx, input.PostId)

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
