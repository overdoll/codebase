package command

import (
	"context"
	"errors"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/libraries/money"
	"time"
)

type ClubPaymentDeposit struct {
	AccountId                   string
	ClubId                      string
	AccountTransactionId        string
	Amount                      int64
	Currency                    string
	Timestamp                   time.Time
	IsClubSupporterSubscription bool
}

type ClubPaymentDepositHandler struct {
	event event.Repository
}

func NewClubPaymentDepositHandler(event event.Repository) ClubPaymentDepositHandler {
	return ClubPaymentDepositHandler{event: event}
}

func (h ClubPaymentDepositHandler) Handle(ctx context.Context, cmd ClubPaymentDeposit) error {

	if !cmd.IsClubSupporterSubscription {
		return errors.New("invalid payment type - only club supporter subscriptions are supported")
	}

	currency, err := money.CurrencyFromString(cmd.Currency)

	if err != nil {
		return err
	}

	request, err := event.NewClubSupporterSubscriptionPaymentDepositRequest(
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

	return h.event.ClubPaymentDeposit(ctx, request)
}
