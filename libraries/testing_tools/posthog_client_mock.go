package testing_tools

import "github.com/posthog/posthog-go"

type PosthogClientMock struct {
}

func (p PosthogClientMock) Close() error {
	return nil
}

func (p PosthogClientMock) Enqueue(message posthog.Message) error {
	return nil
}

func (p PosthogClientMock) IsFeatureEnabled(payload posthog.FeatureFlagPayload) (interface{}, error) {
	return nil, nil
}

func (p PosthogClientMock) GetFeatureFlag(payload posthog.FeatureFlagPayload) (interface{}, error) {
	return nil, nil
}

func (p PosthogClientMock) ReloadFeatureFlags() error {
	return nil
}

func (p PosthogClientMock) GetFeatureFlags() ([]posthog.FeatureFlag, error) {
	return nil, nil
}

func (p PosthogClientMock) GetAllFlags(key posthog.FeatureFlagPayloadNoKey) (map[string]interface{}, error) {
	return nil, nil

}
