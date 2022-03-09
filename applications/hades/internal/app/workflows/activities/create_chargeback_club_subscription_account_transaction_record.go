package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type CreateChargebackClubSubscriptionAccountTransactionRecordInput struct {
	AccountId string

	CCBillSubscriptionId *string

	ClubId    string
	Timestamp time.Time

	Currency string
	Amount   int64
	Reason   string

	CardBin            string
	CardType           string
	CardLast4          string
	CardExpirationDate string
}

func (h *Activities) CreateChargebackClubSubscriptionAccountTransactionRecord(ctx context.Context, input CreateChargebackClubSubscriptionAccountTransactionRecordInput) error {

	card, err := billing.NewCard(input.CardBin, input.CardType, input.CardLast4, input.CardExpirationDate)

	if err != nil {
		return err
	}

	paymentMethod, err := billing.NewPaymentMethod(card, nil, nil)

	if err != nil {
		return err
	}

	transaction, err := billing.NewChargebackClubSubscriptionAccountTransaction(
		input.AccountId,
		input.ClubId,
		input.CCBillSubscriptionId,
		input.Timestamp,
		input.Reason,
		input.Amount,
		input.Currency,
		paymentMethod,
	)

	if err := h.billing.CreateAccountTransactionHistoryOperator(ctx, transaction); err != nil {
		return err
	}

	return nil
}
