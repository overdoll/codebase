package activities

import (
	"context"
)

func (h *Activities) GetPayoutWorkflowId(ctx context.Context, payoutId string) (*string, error) {

	pay, err := h.par.GetPayoutWorkflowId(ctx, payoutId)

	if err != nil {
		return nil, err
	}

	return pay, nil
}
