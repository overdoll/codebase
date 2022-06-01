package adapters

import (
	"context"
	"fmt"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"time"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) ClubPaymentDeposit(ctx context.Context, request *event.PaymentRequest) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "ClubPaymentDeposit_" + request.AccountTransactionId(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ClubPaymentDeposit, workflows.ClubPaymentDepositInput{
		AccountTransactionId:        request.AccountTransactionId(),
		SourceAccountId:             request.SourceAccountId(),
		DestinationClubId:           request.DestinationClubId(),
		Amount:                      request.Amount(),
		Currency:                    request.Currency(),
		Timestamp:                   request.Timestamp(),
		IsClubSupporterSubscription: request.IsClubSupporterSubscription(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute club payment deposit workflow")
	}

	return nil
}

func (r EventTemporalRepository) ClubPaymentDeduction(ctx context.Context, request *event.PaymentRequest) error {

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "ClubPaymentDeduction_" + request.AccountTransactionId(),
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ClubPaymentDeduction, workflows.ClubPaymentDeductionInput{
		AccountTransactionId:        request.AccountTransactionId(),
		SourceAccountId:             request.SourceAccountId(),
		DestinationClubId:           request.DestinationClubId(),
		Amount:                      request.Amount(),
		Currency:                    request.Currency(),
		Timestamp:                   request.Timestamp(),
		IsClubSupporterSubscription: request.IsClubSupporterSubscription(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute club payment deduction workflow")
	}

	return nil
}

func (r EventTemporalRepository) CancelClubPayout(ctx context.Context, requester *principal.Principal, pay *payout.ClubPayout) error {

	if err := pay.CanCancel(requester); err != nil {
		return err
	}

	if err := r.client.CancelWorkflow(ctx, pay.TemporalWorkflowId(), ""); err != nil {
		return errors.Wrap(err, fmt.Sprintf("failed to execute cancel club payout workflow %s", pay.TemporalWorkflowId()))
	}

	return nil
}

func (r EventTemporalRepository) InitiateClubPayout(ctx context.Context, clubId string, depositDate *time.Time) error {

	workflowId := "GenerateClubMonthlyPayout_Manual_" + clubId

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        workflowId,
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.GenerateClubMonthlyPayout, workflows.GenerateClubMonthlyPayoutInput{
		ClubId:     clubId,
		FutureTime: depositDate,
		WorkflowId: workflowId,
		CanCancel:  true,
	})

	if err != nil {
		return errors.Wrap(err, "failed to execute initiate club payout workflow")
	}

	return nil
}

func (r EventTemporalRepository) RetryClubPayout(ctx context.Context, requester *principal.Principal, pay *payout.ClubPayout) error {

	if err := pay.CanRetry(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "RetryClubPayout_" + pay.Id(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.RetryClubPayout, workflows.RetryClubPayoutInput{PayoutId: pay.Id()})

	if err != nil {
		return errors.Wrap(err, "failed to execute retry club payout workflow")
	}

	return nil
}

func (r EventTemporalRepository) UpdateClubPayoutDepositDate(ctx context.Context, requester *principal.Principal, pay *payout.ClubPayout, newTime time.Time) error {

	if err := pay.CanUpdateDepositDate(requester); err != nil {
		return err
	}

	if err := r.client.SignalWorkflow(ctx, pay.TemporalWorkflowId(), "", workflows.UpdatePayoutDateSignal, newTime); err != nil {
		return errors.Wrap(err, fmt.Sprintf("failed to signal workflow UpdatePayoutSignal %s", pay.TemporalWorkflowId()))
	}

	return nil
}
