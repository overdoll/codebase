package workflows

import (
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/loader/internal/app/workflows/activities"
	"overdoll/libraries/media/proto"
	"time"
)

type ProcessMediaInput struct {
	Media       *proto.Media
	Pixelate    *int
	Source      string
	IsNotFound  bool
	AlreadySent bool
}

type ProcessMediaPayload struct {
	Media *proto.Media
}

func ProcessMedia(ctx workflow.Context, input ProcessMediaInput) (*ProcessMediaPayload, error) {

	ctx = workflow.WithActivityOptions(ctx, workflow.ActivityOptions{
		StartToCloseTimeout: time.Hour * 24,
		HeartbeatTimeout:    time.Minute * 10,
		RetryPolicy: &temporal.RetryPolicy{
			InitialInterval:    time.Second,
			BackoffCoefficient: 10.0,
			MaximumInterval:    time.Minute * 10,
		},
	})

	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	var payload *activities.ProcessMediaPayload

	if input.Pixelate == nil {
		if err := workflow.ExecuteActivity(ctx, a.ProcessMediaFromUpload,
			activities.ProcessMediaFromUploadInput{
				Media: input.Media,
			},
		).Get(ctx, &payload); err != nil {
			logger.Error("failed to process media", "Error", err)
			return nil, err
		}
	} else {
		if err := workflow.ExecuteActivity(ctx, a.GenerateFilteredImageFromMedia,
			activities.GenerateFilteredImageFromMediaInput{
				Media:    input.Media,
				Pixelate: input.Pixelate,
			},
		).Get(ctx, &payload); err != nil {
			logger.Error("failed to process media with filters", "Error", err)
			return nil, err
		}

	}

	if payload.AlreadySent {
		input.AlreadySent = true
	}

	input.Media = payload.Media

	totalTimes := 2

	for i := 0; i < totalTimes; i++ {

		if input.IsNotFound || input.AlreadySent {
			break
		}

		if i == 1 {
			// first error, we sleep
			if err := workflow.Sleep(ctx, time.Second*10); err != nil {
				logger.Error("failed to sleep", "Error", err)
				return nil, err
			}
		}

		var sendCallbackPayload *activities.SendCallbackPayload

		if err := workflow.ExecuteActivity(ctx, a.SendCallback,
			activities.SendCallbackInput{
				Media:  input.Media,
				Source: input.Source,
			},
		).Get(ctx, &sendCallbackPayload); err != nil {
			logger.Error("failed to send callback", "Error", err)
			return nil, err
		}

		if sendCallbackPayload.NotFound {
			if i == 1 {
				input.IsNotFound = true
			}
		} else {
			input.AlreadySent = true
		}
	}

	return &ProcessMediaPayload{Media: input.Media}, nil
}
