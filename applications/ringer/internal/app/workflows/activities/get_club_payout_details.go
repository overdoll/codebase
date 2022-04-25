package activities

import (
	"context"
)

type GetClubPayoutDetailsPayload struct {
	TemporalWorkflowId string
}

func (h *Activities) GetClubPayoutDetails(ctx context.Context, payoutId string) (*GetClubPayoutDetailsPayload, error) {

	pay, err := h.par.GetClubPayoutByIdOperator(ctx, payoutId)

	if err != nil {
		return nil, err
	}

	return &GetClubPayoutDetailsPayload{TemporalWorkflowId: pay.TemporalWorkflowId()}, nil
}
