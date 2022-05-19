package workflows

import (
	"github.com/gocql/gocql"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/libraries/money"
	"time"
)

type ClubTransactionMetricInput struct {
	ClubId    string
	Timestamp time.Time
	Id        string
	Amount    uint64
	Currency  money.Currency

	IsRefund     bool
	IsChargeback bool
}

func ClubTransactionMetric(ctx workflow.Context, input ClubTransactionMetricInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// create idempotent uuid from time
	idempotentUUID := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
		return gocql.UUIDFromTime(input.Timestamp)
	})

	var gUUID gocql.UUID

	if err := idempotentUUID.Get(&gUUID); err != nil {
		return err
	}

	// create a transaction metric
	if err := workflow.ExecuteActivity(ctx, a.CreateClubTransactionMetric,
		activities.CreateClubTransactionMetricInput{
			ClubId:       input.ClubId,
			Id:           input.Id,
			Timestamp:    gUUID,
			Currency:     input.Currency,
			Amount:       input.Amount,
			IsRefund:     input.IsRefund,
			IsChargeback: input.IsChargeback,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// if it's a chargeback, we will run an activity to check the chargeback ratio
	if input.IsChargeback {

		var resultPayload *activities.CheckClubTransactionChargebackMetricPayload

		if err := workflow.ExecuteActivity(ctx, a.CheckClubTransactionChargebackMetric,
			activities.CheckClubTransactionChargebackMetricInput{
				ClubId:    input.ClubId,
				Timestamp: input.Timestamp,
			},
		).Get(ctx, &resultPayload); err != nil {
			return err
		}

		// if a suspension occurred, send a notification to staff
		if resultPayload.Suspended {
			if err := workflow.ExecuteActivity(ctx, a.SendClubOverChargebackThresholdNotification,
				activities.SendClubOverChargebackThresholdNotificationInput{
					ClubId:    input.ClubId,
					Threshold: resultPayload.ChargebackFloat,
				},
			).Get(ctx, nil); err != nil {
				return err
			}
		}
	}

	return nil
}
