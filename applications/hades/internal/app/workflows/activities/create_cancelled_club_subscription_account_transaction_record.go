package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CreateCancelledClubSubscriptionAccountTransactionRecord struct {
	AccountId string
	ClubId    string

	CCBillSubscriptionId string

	Timestamp string

	Reason string
}

func (h *Activities) CreateCancelledAccountTransactionRecord(ctx context.Context, request CreateCancelledClubSubscriptionAccountTransactionRecord) error {

	timestamp, err := ccbill.ParseCCBillDateWithTime(request.Timestamp)

	if err != nil {
		return err
	}

	transaction, err := billing.NewCancelledClubSubscriptionAccountTransactionFromCCBill(
		request.AccountId,
		request.ClubId,
		request.CCBillSubscriptionId,
		timestamp,
		request.Reason,
	)

	if err != nil {
		return err
	}

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
