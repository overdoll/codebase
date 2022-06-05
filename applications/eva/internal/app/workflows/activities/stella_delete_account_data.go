package activities

import (
	"context"
)

func (h *Activities) StellaDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.stella.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
