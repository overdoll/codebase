package clients

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/workflow"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/temporal_support"
)

func NewTemporalClient(ctx context.Context) client.Client {

	data, err := temporal_support.NewEncryptDataConverterV1(temporal_support.Options{
		EncryptionKey: []byte(os.Getenv("TEMPORAL_ENCRYPTION_KEY")),
	})

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "unable to create temporal data converter"))
		zap.S().Fatalw("unable to create temporal data converter", zap.Error(err))
	}

	c, err := client.NewClient(client.Options{
		HostPort:           os.Getenv("TEMPORAL_URL"),
		Namespace:          os.Getenv("TEMPORAL_NAMESPACE"),
		DataConverter:      data,
		Logger:             temporal_support.NewZapAdapter(zap.L()),
		ContextPropagators: []workflow.ContextPropagator{sentry_support.NewContextSentryPropagator()},
	})

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "unable to create temporal client"))
		zap.S().Fatalw("unable to create temporal client", zap.Error(err))
	}

	return c
}
