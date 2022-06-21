package command

import (
	"context"
	"overdoll/applications/carrier/internal/domain/formatters"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterSubscriptionDuplicate struct {
	AccountId string
	ClubId    string
	Amount    uint64
	Currency  string
}

type ClubSupporterSubscriptionDuplicateHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewClubSupporterSubscriptionDuplicateHandler(mr mailing.Repository, eva EvaService, sting StingService) ClubSupporterSubscriptionDuplicateHandler {
	return ClubSupporterSubscriptionDuplicateHandler{mr: mr, eva: eva, sting: sting}
}

func (h ClubSupporterSubscriptionDuplicateHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionDuplicate) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return err
	}

	clubDetails, err := h.sting.GetClub(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

	if err != nil {
		return err
	}

	formattedCurrency, err := formatters.Currency(cmd.Amount, cmd.Currency)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"club_supporter_subscription_duplicate",
		map[string]interface{}{
			"Username":        acc.Username(),
			"ClubName":        clubDetails.Name(),
			"ClubLink":        clubUrl.String(),
			"FormattedAmount": *formattedCurrency,
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
