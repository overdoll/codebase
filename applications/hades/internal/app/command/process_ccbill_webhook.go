package command

import (
	"context"
	"fmt"
	"overdoll/applications/hades/internal/domain/event"
)

type ProcessCCBillWebhook struct {
	Payload   []byte
	EventType string
}

type ProcessCCBillWebhookHandler struct {
	event event.Repository
}

func NewProcessCCBillWebhookHandler(event event.Repository) ProcessCCBillWebhookHandler {
	return ProcessCCBillWebhookHandler{event: event}
}

func (h ProcessCCBillWebhookHandler) Handle(ctx context.Context, cmd ProcessCCBillWebhook) error {

	switch cmd.EventType {
	case "NewSaleSuccess": // new subscription - success
		return h.event.CCBillNewSaleSuccess(ctx, cmd.Payload)
	case "RenewalSuccess": // renewal
		return h.event.CCBillRenewalSuccess(ctx, cmd.Payload)
	case "Chargeback": // card chargeback
		return h.event.CCBillChargeback(ctx, cmd.Payload)
	case "Refund": // subscription refund
		return h.event.CCBillRefund(ctx, cmd.Payload)
	case "Void": // subscription void
		return h.event.CCBillVoid(ctx, cmd.Payload)
	case "Cancellation": // subscription cancelled
		return h.event.CCBillCancellation(ctx, cmd.Payload)
	case "Expiration": // subscription expired, after being cancelled
		return h.event.CCBillExpiration(ctx, cmd.Payload)
	case "UserReactivation": // user re-activates cancelled subscription
		return h.event.CCBillUserReactivation(ctx, cmd.Payload)
	case "BillingDateChange": // subscription next billing date changed
		return h.event.CCBillBillingDateChange(ctx, cmd.Payload)
	case "CustomerDataUpdate": // customer updated data (credit card, payment info, etc...)
		return h.event.CCBillCustomerDataUpdate(ctx, cmd.Payload)
	case "RenewalFailure": // failure to renew (rebill declined)
		return h.event.CCBillRenewalFailure(ctx, cmd.Payload)
	default:
		fmt.Printf("event not processed: %s", cmd.EventType)
	}

	return nil
}
