package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"time"
)

type CreateReactivatedClubSubscriptionAccountTransactionRecordInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId string
	NextBillingDate      string
}

func (h *Activities) CreateReactivatedClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateReactivatedClubSubscriptionAccountTransactionRecordInput) error {

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextBillingDate)

	if err != nil {
		return err
	}

	transaction, err := billing.NewReactivatedClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		time.Now(),
		nextBillingDate,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
