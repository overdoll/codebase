package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type GenerateClubSupporterRefundReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId      string
	AccountTransactionHistoryEventId string
}

func GenerateClubSupporterRefundReceiptFromAccountTransactionHistory(ctx workflow.Context, input GenerateClubSupporterRefundReceiptFromAccountTransactionHistoryInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterRefundReceiptFromAccountTransactionHistory,
		activities.GenerateClubSupporterRefundReceiptFromAccountTransactionHistoryInput{
			AccountTransactionHistoryId:      input.AccountTransactionHistoryId,
			AccountTransactionHistoryEventId: input.AccountTransactionHistoryEventId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
