package event

import "context"

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
	CancelActiveSubscriptionsForClub(ctx context.Context, clubId string) error
}
