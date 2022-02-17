package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateReactivatedClubSubscriptionAccountTransactionRecord struct {
	AccountId string
	ClubId    string
	Timestamp string

	CCBillSubscriptionId string
	CCBillTransactionId  string

	NextBillingDate string
}

func (h *Activities) CreateReactivatedClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateReactivatedClubSubscriptionAccountTransactionRecord) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextBillingDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewReactivatedClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		request.CCBillTransactionId,
		timestamp,
		nextBillingDate,
	)

	if err := h.billing.CreateAccountTransactionHistory(ctx, transaction); err != nil {
		return err
	}

	return nil
}
