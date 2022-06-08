package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/links"
	"time"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterSubscriptionCancelled struct {
	AccountId      string
	ClubId         string
	SubscriptionId string
	ExpirationDate time.Time
}

type ClubSupporterSubscriptionCancelledHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterSubscriptionCancelledHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterSubscriptionCancelledHandler {
	return ClubSupporterSubscriptionCancelledHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterSubscriptionCancelledHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionCancelled) error {

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
		"club_supporter_subscription_cancelled",
		map[string]interface{}{
			"Username":         acc.Username(),
			"ClubName":         clubDetails.Name(),
			"ClubLink":         clubUrl.String(),
			"SubscriptionLink": subscriptionUrl.String(),
			"ExpirationDate":   cmd.ExpirationDate.Format("January 02"),
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
