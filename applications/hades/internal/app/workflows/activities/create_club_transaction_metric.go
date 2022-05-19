package activities

import (
	"context"
	"github.com/gocql/gocql"
	"overdoll/applications/hades/internal/domain/metrics"
	"overdoll/libraries/money"
)

type CreateClubTransactionMetricInput struct {
	ClubId string
	Id     string

	Timestamp gocql.UUID

	Currency money.Currency
	Amount   uint64

	IsRefund     bool
	IsChargeback bool
}

func (h *Activities) CreateClubTransactionMetric(ctx context.Context, input CreateClubTransactionMetricInput) error {

	var metric *metrics.ClubTransactionMetric
	var err error

	if input.IsRefund {

		metric, err = metrics.NewRefundTransactionMetric(
			input.ClubId,
			input.Timestamp,
			input.Id,
			input.Amount,
			input.Currency,
		)

		if err != nil {
			return err
		}
	}

	if input.IsChargeback {

		metric, err = metrics.NewChargebackTransactionMetric(
			input.ClubId,
			input.Timestamp,
			input.Id,
			input.Amount,
			input.Currency,
		)

		if err != nil {
			return err
		}
	}

	if metric == nil {

		metric, err = metrics.NewInitialTransactionMetric(
			input.ClubId,
			input.Timestamp,
			input.Id,
			input.Amount,
			input.Currency,
		)

		if err != nil {
			return err
		}
	}

	if err := h.mr.CreateClubTransactionMetric(ctx, metric); err != nil {
		return err
	}

	return nil
}
