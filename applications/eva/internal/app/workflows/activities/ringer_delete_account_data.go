package activities

import (
	"context"
)

func (h *Activities) RingerDeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.ringer.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
