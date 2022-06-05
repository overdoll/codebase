package activities

import (
	"context"
)

type AccountDeletedInput struct {
	Username string
	Email    string
}

func (h *Activities) AccountDeleted(ctx context.Context, input AccountDeletedInput) error {

	if err := h.carrier.AccountDeleted(ctx, input.Username, input.Email); err != nil {
		return err
	}

	return nil
}
