package workflows

import (
	"errors"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/eva/internal/app/workflows/activities"
)

type DeleteAccountInput struct {
	AccountId  string
	WorkflowId string
	CanCancel  bool
}

func DeleteAccount(ctx workflow.Context, input DeleteAccountInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	timestamp := workflow.Now(ctx)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// if workflow is cancelled, we want to clean up by cancelling the account deletion
	defer func() {

		if !errors.Is(ctx.Err(), workflow.ErrCanceled) {
			return
		}

		if !input.CanCancel {
			return
		}

		newCtx, _ := workflow.NewDisconnectedContext(ctx)
		err := workflow.ExecuteActivity(newCtx, a.UpdateAccountCancelDeletion, activities.UpdateAccountCancelDeletionInput{
			AccountId: input.AccountId,
		}).Get(ctx, nil)

		if err != nil {
			logger.Error("failed to cleanup cancel account deletion", "Error", err)
			return
		}
	}()

	var payload *activities.UpdateAccountIsDeletingPayload

	// update the account to mark that it's deleting
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountIsDeleting,
		activities.UpdateAccountIsDeletingInput{
			AccountId:  input.AccountId,
			Timestamp:  timestamp,
			WorkflowId: input.WorkflowId,
		},
	).Get(ctx, &payload); err != nil {
		return err
	}

	// send a notification that account deletion has begun
	if err := workflow.ExecuteActivity(ctx, a.AccountDeletionBegin,
		activities.AccountDeletionBeginInput{
			AccountId:    input.AccountId,
			DeletionDate: payload.DeletionDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	duration := payload.DeletionDate.Sub(workflow.Now(ctx))

	// halfway through, send a reminder
	if err := workflow.Sleep(ctx, duration/2); err != nil {
		return err
	}

	// reminder
	if err := workflow.ExecuteActivity(ctx, a.AccountDeletionReminder,
		activities.AccountDeletionReminderInput{
			AccountId:    input.AccountId,
			DeletionDate: payload.DeletionDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// wait for second half of duration
	if err := workflow.Sleep(ctx, duration/2); err != nil {
		return err
	}

	workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
		// update to say that we cannot cancel anymore
		input.CanCancel = false
		return nil
	})

	// delete all payment data
	if err := workflow.ExecuteActivity(ctx, a.HadesDeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// delete all membership data
	if err := workflow.ExecuteActivity(ctx, a.StellaDeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// delete all account reports/moderation data
	if err := workflow.ExecuteActivity(ctx, a.ParleyDeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// delete all curation profile / likes
	if err := workflow.ExecuteActivity(ctx, a.StingDeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// delete any account details / payout details if we have them
	if err := workflow.ExecuteActivity(ctx, a.RingerDeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// delete all data associated with the account - multi-factor, any emails, etc...
	if err := workflow.ExecuteActivity(ctx, a.DeleteAccountData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// get data for the account, so we can send the final reminder
	var accountDataPayload *activities.GetAccountDataPayload

	if err := workflow.ExecuteActivity(ctx, a.GetAccountData, input.AccountId).Get(ctx, &accountDataPayload); err != nil {
		return err
	}

	// mark account as "deleted"
	if err := workflow.ExecuteActivity(ctx, a.UpdateAccountDeleted,
		activities.UpdateAccountDeletedInput{
			AccountId: input.AccountId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// delete all sessions, so any logged-in accounts are kicked out
	if err := workflow.ExecuteActivity(ctx, a.DeleteSessionData, input.AccountId).Get(ctx, nil); err != nil {
		return err
	}

	// send the final notification that the account has been successfully deleted.
	if err := workflow.ExecuteActivity(ctx, a.AccountDeleted,
		activities.AccountDeletedInput{
			Username: accountDataPayload.Username,
			Email:    accountDataPayload.Email,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
