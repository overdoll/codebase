package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/eva/internal/app/workflows"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) DeleteAccount(ctx context.Context, requester *principal.Principal, acc *account.Account) error {

	if err := acc.CanDelete(requester); err != nil {
		return err
	}

	workflowId := "DeleteAccount_" + acc.ID()

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        workflowId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.DeleteAccount, workflows.DeleteAccountInput{
		AccountId:  acc.ID(),
		WorkflowId: workflowId,
		CanCancel:  true,
	}); err != nil {
		return errors.Wrap(err, "failed to execute delete account workflow")
	}

	return nil
}

func (r EventTemporalRepository) CancelAccountDeletion(ctx context.Context, requester *principal.Principal, acc *account.Account) error {

	if err := acc.CanCancelDeletion(requester); err != nil {
		return err
	}

	if err := r.client.CancelWorkflow(ctx, *acc.ScheduledDeletionWorkflowId(), ""); err != nil {
		return errors.Wrap(err, "failed to cancel account deletion workflow")
	}

	return nil
}
