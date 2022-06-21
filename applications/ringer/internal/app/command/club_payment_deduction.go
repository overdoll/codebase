package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"time"
)

type ClubPaymentDeduction struct {
	IdempotencyKey              string
	AccountId                   string
	ClubId                      string
	AccountTransactionId        string
	Amount                      uint64
	Currency                    string
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

type ClubPaymentDeductionHandler struct {
	event event.Repository
}

func NewClubPaymentDeductionHandler(event event.Repository) ClubPaymentDeductionHandler {
	return ClubPaymentDeductionHandler{event: event}
}

func (h ClubPaymentDeductionHandler) Handle(ctx context.Context, cmd ClubPaymentDeduction) error {

	if !cmd.IsClubSupporterSubscription {
		return domainerror.NewValidation("invalid payment type - only club supporter subscriptions are supported")
	}

	currency, err := money.CurrencyFromString(cmd.Currency)

	if err != nil {
		return err
	}

	request, err := event.NewClubSupporterSubscriptionPaymentDeductionRequest(
		cmd.IdempotencyKey,
		cmd.AccountTransactionId,
		cmd.AccountId,
		cmd.ClubId,
		cmd.Amount,
		currency,
		cmd.Timestamp,
	)

	if err != nil {
		return err
	}

	return h.event.ClubPaymentDeduction(ctx, request)
}
