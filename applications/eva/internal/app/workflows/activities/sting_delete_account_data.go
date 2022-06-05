package activities

import (
	"context"
)

func (h *Activities) StingDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.sting.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
