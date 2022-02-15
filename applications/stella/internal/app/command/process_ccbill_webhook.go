package command

import (
	"context"
	"fmt"
	"overdoll/applications/stella/internal/domain/billing"
	"overdoll/applications/stella/internal/domain/event"
)

type ProcessCCBillWebhook struct {
	Payload   []byte
	EventType string
}

type ProcessCCBillWebhookHandler struct {
	br    billing.Repository
	event event.Repository
}

func NewProcessCCBillWebhookHandler(br billing.Repository, event event.Repository) ProcessCCBillWebhookHandler {
	return ProcessCCBillWebhookHandler{br: br, event: event}
}

func (h ProcessCCBillWebhookHandler) Handle(ctx context.Context, cmd ProcessCCBillWebhook) error {

	switch cmd.EventType {
	// user re-activates subscription
	case "UserReactivation":
		// new subscription - success
	case "NewSaleSuccess":
		// subscription next billing date changed
	case "BillingDateChange":
		// customer updated data (credit card, payment info, etc...)
	case "CustomerDataUpdate":
		// successfully rebilled
	case "RenewalSuccess":
		// card chargeback
	case "Chargeback":
		// subscription refund
	case "Refund":
		// subscription void
	case "Void":
		// subscription cancelled
	case "Cancellation":
		// subscription expired(?)
	case "Expiration":
		// failure to renew (rebill declined)
	case "RenewalFailure":
	default:
		fmt.Println("event not processed: ")
	}

	return nil
}
