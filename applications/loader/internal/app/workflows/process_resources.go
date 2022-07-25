package workflows

import (
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"time"
)

type ProcessResourcesInput struct {
	ItemId      string
	ResourceId  string
	Source      string
	IsNotFound  bool
	AlreadySent bool
	Width       uint64
	Height      uint64
}

const (
	ProcessResourcesProgressAppendSignal = "process-resources-progress-append"
	ProcessResourcesProgressQuery        = "process-resources-progress"
)

func ProcessResources(ctx workflow.Context, input ProcessResourcesInput) error {

	progress := float64(-1)

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute,
		RetryPolicy: &temporal.RetryPolicy{
			InitialInterval:    time.Second,
			BackoffCoefficient: 2.0,
			MaximumInterval:    time.Minute,
		},
	})

	logger := workflow.GetLogger(ctx)
	selector := workflow.NewSelector(ctx)

	selector.AddReceive(workflow.GetSignalChannel(ctx, ProcessResourcesProgressAppendSignal), func(channel workflow.ReceiveChannel, more bool) {
		channel.Receive(ctx, &progress)
	})

	if err := workflow.SetQueryHandler(ctx, ProcessResourcesProgressQuery, func() (float64, error) {
		return progress, nil
	}); err != nil {
		return err
	}

	var a *activities.Activities

	if err := workflow.ExecuteActivity(ctx, a.ProcessResources,
		activities.ProcessResourcesInput{
			ItemId:     input.ItemId,
			ResourceId: input.ResourceId,
			Width:      input.Width,
			Height:     input.Height,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to process resources", "Error", err)
		return err
	}

	// wait for some sort of progress signal - we always send one
	selector.Select(ctx)

	// transitioned to a different state of progress
	progress = -2

	totalTimes := 2

	for i := 0; i < totalTimes; i++ {

		if input.IsNotFound || input.AlreadySent {
			break
		}

		if i == 1 {
			// first error, we sleep
			if err := workflow.Sleep(ctx, time.Second*10); err != nil {
				logger.Error("failed to sleep", "Error", err)
				return err
			}
		}

		var sendCallbackPayload *activities.SendCallbackPayload

		if err := workflow.ExecuteActivity(ctx, a.SendCallback,
			activities.SendCallbackInput{
				ItemId:      input.ItemId,
				ResourceIds: []string{input.ResourceId},
				Source:      input.Source,
			},
		).Get(ctx, &sendCallbackPayload); err != nil {
			logger.Error("failed to send callback", "Error", err)
			return err
		}

		if sendCallbackPayload.NotFound {
			if i == 1 {
				input.IsNotFound = true
			}
		} else {
			input.AlreadySent = true
		}
	}

	return nil
}
