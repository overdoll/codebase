package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/formatters"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterSubscriptionRefunded struct {
	AccountId      string
	ClubId         string
	SubscriptionId string
	TransactionId  string
	Amount         int64
	Currency       string
}

type ClubSupporterSubscriptionRefundedHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterSubscriptionRefundedHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterSubscriptionRefundedHandler {
	return ClubSupporterSubscriptionRefundedHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterSubscriptionRefundedHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionRefunded) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	clubDetails, err := h.stella.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return errors.Wrap(err, "failed to get club")
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	subscriptionUrl, err := links.CreateManageSubscriptionUrl()

	if err != nil {
		return err
	}

	transactionUrl, err := links.CreateTransactionDetailsUrl(cmd.TransactionId)

	if err != nil {
		return err
	}

	formattedCurrency, err := formatters.Currency(cmd.Amount, cmd.Currency)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_supporter_subscription_refunded",
		map[string]interface{}{
			"Username":         acc.Username(),
			"ClubName":         clubDetails.Name(),
			"ClubLink":         clubUrl.String(),
			"SubscriptionLink": subscriptionUrl.String(),
			"TransactionLink":  transactionUrl.String(),
			"FormattedAmount":  *formattedCurrency,
			"SubscriptionId":   cmd.SubscriptionId,
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
