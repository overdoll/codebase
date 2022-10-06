package capture

import "context"

type Repository interface {
	CaptureNewAccountClubSupporterSubscription(ctx context.Context, accountId, clubId string) error
}
