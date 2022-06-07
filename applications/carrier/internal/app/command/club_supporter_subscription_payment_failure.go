package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterSubscriptionPaymentFailure struct {
	AccountId      string
	ClubId         string
	SubscriptionId string
}

type ClubSupporterSubscriptionPaymentFailureHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterSubscriptionPaymentFailureHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterSubscriptionPaymentFailureHandler {
	return ClubSupporterSubscriptionPaymentFailureHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterSubscriptionPaymentFailureHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionPaymentFailure) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	clubDetails, err := h.stella.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	subscriptionUrl, err := links.CreateManageSingleSubscriptionUrl(cmd.SubscriptionId)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_supporter_subscription_payment_failure",
		map[string]interface{}{
			"Username":         acc.Username(),
			"ClubName":         clubDetails.Name(),
			"ClubLink":         clubUrl.String(),
			"SubscriptionLink": subscriptionUrl.String(),
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
