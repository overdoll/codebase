package activities

import (
	"context"
)

func (h *Activities) DeleteAccountData(ctx context.Context, accountId string) error {

	if err := h.ar.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	if err := h.mr.DeleteAccountData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
