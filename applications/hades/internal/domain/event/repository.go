package event

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/principal"
)

type Repository interface {
	CCBillUpSaleSuccess(ctx context.Context, payload []byte) error
	CCBillNewSaleSuccess(ctx context.Context, payload []byte) error
	CCBillRenewalSuccess(ctx context.Context, payload []byte) error
	CCBillChargeback(ctx context.Context, payload []byte) error
	CCBillRefund(ctx context.Context, payload []byte) error
	CCBillVoid(ctx context.Context, payload []byte) error
	CCBillCancellation(ctx context.Context, payload []byte) error
	CCBillExpiration(ctx context.Context, payload []byte) error
	CCBillUserReactivation(ctx context.Context, payload []byte) error
	CCBillBillingDateChange(ctx context.Context, payload []byte) error
	CCBillCustomerDataUpdate(ctx context.Context, payload []byte) error
	CCBillRenewalFailure(ctx context.Context, payload []byte) error
	CancelActiveSupporterSubscriptionsForClub(ctx context.Context, clubId string) error
	CancelAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, subscription *billing.AccountClubSupporterSubscription, cancellationReason *cancellation.Reason) error
}
