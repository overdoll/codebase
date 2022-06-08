package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type GenerateClubSupporterRefundReceiptFromAccountTransactionInput struct {
	AccountTransactionId      string
	AccountTransactionEventId string
}

func GenerateClubSupporterRefundReceiptFromAccountTransaction(ctx workflow.Context, input GenerateClubSupporterRefundReceiptFromAccountTransactionInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterRefundReceiptFromAccountTransaction,
		activities.GenerateClubSupporterRefundReceiptFromAccountTransactionInput{
			AccountTransactionId:      input.AccountTransactionId,
			AccountTransactionEventId: input.AccountTransactionEventId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to generate club supporter refund receipt from account transaction", "Error", err)
		return err
	}

	return nil
}
