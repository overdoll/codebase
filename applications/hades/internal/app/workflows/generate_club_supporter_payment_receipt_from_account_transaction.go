package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransactionInput struct {
	AccountTransactionId string
}

func GenerateClubSupporterPaymentReceiptFromAccountTransaction(ctx workflow.Context, input GenerateClubSupporterPaymentReceiptFromAccountTransactionInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.GenerateClubSupporterPaymentReceiptFromAccountTransaction,
		activities.GenerateClubSupporterPaymentReceiptFromAccountTransactionInput{
			AccountTransactionId: input.AccountTransactionId,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to generate club supporter payment receipt from account transaction", "Error", err)
		return err
	}

	return nil
}
