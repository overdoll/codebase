package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateExpiredClubSubscriptionAccountTransactionRecordInput struct {
	AccountId            string
	CCBillSubscriptionId string
	ClubId               string
	Timestamp            string
}

func (h *Activities) CreateExpiredClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateExpiredClubSubscriptionAccountTransactionRecordInput) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewExpiredClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
