package activities

import (
	"context"
	"time"
)

type CheckClubTransactionChargebackMetricInput struct {
	ClubId    string
	Timestamp time.Time
}

type CheckClubTransactionChargebackMetricPayload struct {
	Suspended       bool
	ChargebackFloat float64
}

func (h *Activities) CheckClubTransactionChargebackMetric(ctx context.Context, input CheckClubTransactionChargebackMetricInput) (*CheckClubTransactionChargebackMetricPayload, error) {

	var err error

	returnValue := &CheckClubTransactionChargebackMetricPayload{Suspended: false}

	metric, err := h.mr.GetClubTransactionMetrics(ctx, input.ClubId, input.Timestamp)

	if err != nil {
		return nil, err
	}

	if !metric.IsOverChargebacksThreshold() {
		return returnValue, nil
	}

	// check if we already suspended for the month
	suspended, err := h.mr.IsClubAlreadySuspended(ctx, input.ClubId, input.Timestamp)

	if err != nil {
		return nil, err
	}

	if suspended {
		return returnValue, nil
	}

	returnValue.Suspended = true
	returnValue.ChargebackFloat = metric.ChargebacksCountRatio()

	if err := h.stella.SuspendClub(ctx, input.ClubId, true); err != nil {
		return nil, err
	}

	// create a cache key to ensure it's not going to happen again
	if err := h.mr.AddClubAlreadySuspended(ctx, input.ClubId, input.Timestamp); err != nil {
		return nil, err
	}

	return returnValue, nil
}
