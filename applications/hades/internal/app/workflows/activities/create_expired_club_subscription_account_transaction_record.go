package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateExpiredClubSubscriptionAccountTransactionRecord struct {
	AccountId            string
	CCBillSubscriptionId string
	ClubId               string
	Timestamp            string
}

func (h *Activities) CreateExpiredClubSubscriptionAccountTransactionRecord(ctx context.Context, request CreateExpiredClubSubscriptionAccountTransactionRecord) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewExpiredClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
	)

	if err := h.billing.CreateAccountTransactionHistory(ctx, transaction); err != nil {
		return err
	}

	return nil
}
