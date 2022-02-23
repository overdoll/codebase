package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

func GenerateClubSupporterReceiptFromAccountTransactionHistory(ctx workflow.Context, accountTransactionHistoryId string) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterReceiptFromAccountTransactionHistory,
		accountTransactionHistoryId,
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
