package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type GenerateClubSupporterReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId string
}

func GenerateClubSupporterReceiptFromAccountTransactionHistory(ctx workflow.Context, input GenerateClubSupporterReceiptFromAccountTransactionHistoryInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterReceiptFromAccountTransactionHistory,
		activities.GenerateClubSupporterReceiptFromAccountTransactionHistoryInput{
			AccountTransactionHistoryId: input.AccountTransactionHistoryId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
