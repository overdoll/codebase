package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransactionHistoryInput struct {
	AccountTransactionHistoryId string
}

func GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory(ctx workflow.Context, input GenerateClubSupporterPaymentReceiptFromAccountTransactionHistoryInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory,
		activities.GenerateClubSupporterPaymentReceiptFromAccountTransactionHistoryInput{
			AccountTransactionHistoryId: input.AccountTransactionHistoryId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
