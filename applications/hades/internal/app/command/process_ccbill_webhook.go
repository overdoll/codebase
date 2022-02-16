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
