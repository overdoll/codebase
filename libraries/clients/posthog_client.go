package clients

import (
	"github.com/posthog/posthog-go"
	"go.uber.org/zap"
	"os"
)

func NewPosthogClient() posthog.Client {

	posthogClient, err := posthog.NewWithConfig(
		os.Getenv("POSTHOG_API_KEY"),
		posthog.Config{
			Endpoint:       posthog.DefaultEndpoint,
			PersonalApiKey: os.Getenv("POSTHOG_PERSONAL_API_KEY"),
		},
	)

	if err != nil {
		zap.S().Fatalw("failed to initialize posthog client", zap.Error(err))
	}

	return posthogClient
}
