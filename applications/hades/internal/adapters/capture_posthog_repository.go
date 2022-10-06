package adapters

import (
	"context"
	"github.com/posthog/posthog-go"
	"overdoll/libraries/errors"
)

type CapturePosthogRepository struct {
	client posthog.Client
}

func NewCapturePosthogRepository(client posthog.Client) CapturePosthogRepository {
	return CapturePosthogRepository{
		client: client,
	}
}

func (r CapturePosthogRepository) CaptureNewAccountClubSupporterSubscription(ctx context.Context, accountId, clubId string) error {

	if err := r.client.Enqueue(posthog.Capture{
		DistinctId: accountId,
		Event:      "club-supporter-subscribed",
		Properties: posthog.NewProperties().
			Set("supported-club-id", clubId).
			Set("subscribed-account-id", accountId),
	}); err != nil {
		return errors.Wrap(err, "failed to capture new club supporter subscription")
	}

	return nil
}
