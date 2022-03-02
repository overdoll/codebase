package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"time"
)

type CreateReactivatedClubSubscriptionAccountTransactionRecord struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) CreateReactivatedClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateReactivatedClubSubscriptionAccountTransactionRecord) error {

	nextBillingDate, err := ccbill.ParseCCBillDate(request.NextBillingDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewReactivatedClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		time.Now(),
		nextBillingDate,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
