package activities

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"time"
)

type CreatePendingClubPaymentDepositInput struct {
	Id                          string
	AccountTransactionId        string
	SourceAccountId             string
	DestinationClubId           string
	Amount                      int64
	Currency                    money.Currency
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

func (h *Activities) CreatePendingClubPaymentDeposit(ctx context.Context, input CreatePendingClubPaymentDepositInput) error {
	if !input.IsClubSupporterSubscription {
		return errors.New("only club supporter subscriptions are supported")
	}

	platformFee, err := h.pr.GetPlatformFeeForClubOperator(ctx, input.DestinationClubId)

	if err != nil {
		return err
	}

	pay, err := payment.NewClubSupporterSubscriptionPendingPaymentDeposit(
		platformFee,
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

	return nil
}
