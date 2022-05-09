package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/eva/internal/app/workflows"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) DeleteAccount(ctx context.Context, accountId string) error {

	workflowId := "DeleteAccount_" + accountId

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        workflowId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteAccount, workflows.DeleteAccountInput{
		AccountId:  accountId,
		WorkflowId: workflowId,
		CanCancel:  true,
	}); err != nil {
		return err
	}

	return nil
}

func (r EventTemporalRepository) CancelAccountDeletion(ctx context.Context, workflowId string) error {

	if err := r.client.CancelWorkflow(ctx, workflowId, ""); err != nil {
		return err
	}

	return nil
}
