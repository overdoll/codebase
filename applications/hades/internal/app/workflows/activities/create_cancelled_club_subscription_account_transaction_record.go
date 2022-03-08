package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateCancelledClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string
	ClubId    string

	CCBillSubscriptionId string

	Timestamp string

	Reason string
}

func (h *Activities) CreateCancelledAccountTransactionRecord(ctx context.Context, input CreateCancelledClubSubscriptionAccountTransactionRecordInput) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewCancelledClubSubscriptionAccountTransactionFromCCBill(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		timestamp,
		input.Reason,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
