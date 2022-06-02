package activities

import (
	"context"
	"overdoll/libraries/errors/domainerror"
)

type IsPostAssignedAModeratorInput struct {
	PostId string
}

func (h *Activities) IsPostAssignedAModerator(ctx context.Context, input IsPostAssignedAModeratorInput) (bool, error) {

	_, err := h.mr.GetPostModeratorByPostIdOperator(ctx, input.PostId)

	if err != nil {

		if domainerror.IsNotFoundError(err) {
			return false, nil
		}

		return false, err
	}

	return true, nil
}
