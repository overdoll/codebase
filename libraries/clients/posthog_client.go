package clients

import (
	"github.com/posthog/posthog-go"
	"go.uber.org/zap"
	"os"
	"overdoll/libraries/testing_tools"
)

func NewPosthogClient() posthog.Client {

	posthogApiKey := os.Getenv("POSTHOG_PROJECT_API_KEY")

	if posthogApiKey == "" {
		return testing_tools.PosthogClientMock{}
	}

	posthogClient, err := posthog.NewWithConfig(
		posthogApiKey,
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
