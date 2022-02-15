package billing

import (
	"context"
)

type Repository interface {
	EnsureUniqueCCBillClubSupporterSubscription(ctx context.Context, paymentLink *CCBillClubSupporterPaymentLink) error
}
