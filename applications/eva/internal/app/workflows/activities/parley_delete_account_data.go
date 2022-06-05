package activities

import (
	"context"
)

func (h *Activities) ParleyDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.parley.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
