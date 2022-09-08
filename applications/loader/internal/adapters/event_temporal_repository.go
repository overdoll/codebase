package adapters

import (
	"context"
	"github.com/spf13/viper"
	"go.temporal.io/sdk/client"
	"overdoll/applications/loader/internal/app/workflows"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

func (r EventTemporalRepository) SendProcessMediaHeartbeat(ctx context.Context, token []byte, heartbeat int64) error {
	if err := r.client.RecordActivityHeartbeat(ctx, token, heartbeat); err != nil {
		return errors.Wrap(err, "failed to record activity heartbeat")
	}

	return nil
}

func (r EventTemporalRepository) GenerateImageFromMedia(ctx context.Context, media *media.Media, newMedia *media.Media, source string, pixelate *int) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "loader.GenerateImageFromMedia_" + media.Id() + "_" + newMedia.Id(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessMedia,
		workflows.ProcessMediaInput{
			SourceMedia: media.Source(),
			Source:      source,
			NewMedia:    newMedia.Source(),
			Pixelate:    pixelate,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources workflow")
	}

	return nil
}

func (r EventTemporalRepository) ProcessMediaForUpload(ctx context.Context, media *media.Media, source string) error {

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "loader.ProcessMediaForUpload_" + media.Source().Link.Id + "_" + media.UploadId(),
	}

	_, err := r.client.ExecuteWorkflow(ctx, options, workflows.ProcessMedia,
		workflows.ProcessMediaInput{
			SourceMedia: media.Source(),
			Source:      source,
		},
	)

	if err != nil {
		return errors.Wrap(err, "failed to run process resources workflow")
	}

	return nil
}
