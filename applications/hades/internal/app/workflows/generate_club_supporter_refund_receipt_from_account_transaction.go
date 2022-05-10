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

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterRefundReceiptFromAccountTransaction,
		activities.GenerateClubSupporterRefundReceiptFromAccountTransactionInput{
			AccountTransactionId:      input.AccountTransactionId,
			AccountTransactionEventId: input.AccountTransactionEventId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
