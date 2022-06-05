package activities

import (
	"context"
)

func (h *Activities) DeleteSessionData(ctx context.Context, accountId string) error {

	if err := h.sr.DeleteAccountSessionData(ctx, accountId); err != nil {
		return err
	}

	return nil
}
