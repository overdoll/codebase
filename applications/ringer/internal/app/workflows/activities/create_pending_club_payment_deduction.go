package activities

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"time"
)

type CreatePendingClubPaymentDeductionInput struct {
	Id                          string
	AccountTransactionId        string
	SourceAccountId             string
	DestinationClubId           string
	Amount                      int64
	Currency                    money.Currency
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

func (h *Activities) CreatePendingClubPaymentDeduction(ctx context.Context, input CreatePendingClubPaymentDeductionInput) error {

	if !input.IsClubSupporterSubscription {
		return errors.New("only club supporter subscriptions are supported")
	}

	existingPayment, err := h.pr.GetClubPaymentByAccountTransactionId(ctx, input.AccountTransactionId)

	if err != nil {
		return err
	}

	pay, err := payment.NewClubSupporterSubscriptionPendingPaymentDeduction(
		existingPayment,
		input.Id,
		input.AccountTransactionId,
		input.SourceAccountId,
		input.DestinationClubId,
		input.Amount,
		input.Currency,
		input.Timestamp,
	)

	if err != nil {
		return err
	}

	if err := h.pr.CreateNewClubPayment(ctx, pay); err != nil {
		return err
	}

	if err := h.pi.IndexClubPayment(ctx, pay); err != nil {
		return err
	}

	return nil
}
