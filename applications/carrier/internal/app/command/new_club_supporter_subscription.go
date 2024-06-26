package command

import (
	"context"
	"os"
	"overdoll/applications/carrier/internal/domain/formatters"
	"overdoll/applications/carrier/internal/domain/links"
	"time"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewClubSupporterSubscription struct {
	AccountId       string
	ClubId          string
	SubscriptionId  string
	Amount          uint64
	Currency        string
	BillingDate     time.Time
	NextBillingDate time.Time
}

type NewClubSupporterSubscriptionHandler struct {
	mr    mailing.Repository
	eva   EvaService
	sting StingService
}

func NewNewClubSupporterSubscriptionHandler(mr mailing.Repository, eva EvaService, sting StingService) NewClubSupporterSubscriptionHandler {
	return NewClubSupporterSubscriptionHandler{mr: mr, eva: eva, sting: sting}
}

func (h NewClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd NewClubSupporterSubscription) error {

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

	subscriptionUrl, err := links.CreateManageSingleSubscriptionUrl(cmd.SubscriptionId)

	if err != nil {
		return err
	}

	formattedCurrency, err := formatters.Currency(cmd.Amount, cmd.Currency)

	if err != nil {
		return err
	}

	template, err := mailing.NewTemplate(
		"new_club_supporter_subscription",
		map[string]interface{}{
			"Username":         acc.Username(),
			"ClubName":         clubDetails.Name(),
			"ClubLink":         clubUrl.String(),
			"SubscriptionLink": subscriptionUrl.String(),
			"BillingDateStart": cmd.BillingDate.Format("Jan 02"),
			"BillingDateEnd":   cmd.NextBillingDate.Format("Jan 02"),
			"FormattedAmount":  *formattedCurrency,
			"SubscriptionId":   cmd.SubscriptionId,
		},
	)

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipient("overdoll", os.Getenv("STAFF_ADDRESS"))

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
