package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/ringer/internal/app/workflows"
	"overdoll/applications/ringer/internal/domain/event"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) ClubPaymentDeposit(ctx context.Context, request *event.PaymentRequest) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ClubPaymentDeposit_" + request.AccountTransactionId(),
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
		return err
	}

	return nil
}

func (r EventTemporalRepository) ClubPaymentDeduction(ctx context.Context, request *event.PaymentRequest) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "ClubPaymentDeduction_" + request.AccountTransactionId(),
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
		return err
	}

	return nil
}
