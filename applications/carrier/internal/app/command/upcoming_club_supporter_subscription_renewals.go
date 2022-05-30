package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/formatters"
	"overdoll/applications/carrier/internal/domain/links"
	"overdoll/applications/carrier/internal/domain/mailing"
	"time"
)

type UpcomingClubSupporterSubscriptionRenewals struct {
	AccountId string
	Renewals  []struct {
		ClubId         string
		SubscriptionId string
		Amount         uint64
		Currency       string
		BillingDate    time.Time
	}
}

type UpcomingClubSupporterSubscriptionRenewalsHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewUpcomingClubSupporterSubscriptionRenewalsHandler(mr mailing.Repository, eva EvaService, stella StellaService) UpcomingClubSupporterSubscriptionRenewalsHandler {
	return UpcomingClubSupporterSubscriptionRenewalsHandler{mr: mr, eva: eva, stella: stella}
}

func (h UpcomingClubSupporterSubscriptionRenewalsHandler) Handle(ctx context.Context, cmd UpcomingClubSupporterSubscriptionRenewals) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	var clubRenewals []map[string]interface{}

	for _, renewal := range cmd.Renewals {

		clubDetails, err := h.stella.GetClub(ctx, renewal.ClubId)

		if err != nil {
			return errors.Wrap(err, "failed to get club")
		}

		clubUrl, err := links.CreateClubUrl(clubDetails.Slug())

		if err != nil {
			return err
		}

		subscriptionUrl, err := links.CreateManageSingleSubscriptionUrl(renewal.SubscriptionId)

		if err != nil {
			return err
		}

		formattedCurrency, err := formatters.Currency(renewal.Amount, renewal.Currency)

		if err != nil {
			return err
		}

		clubRenewals = append(clubRenewals, map[string]interface{}{
			"ClubName":         clubDetails.Name(),
			"ClubLink":         clubUrl.String(),
			"SubscriptionLink": subscriptionUrl.String(),
			"FormattedAmount":  *formattedCurrency,
			"BillingDate":      renewal.BillingDate.Format("MM/DD"),
		})
	}

	template, err := mailing.NewTemplate(
		"upcoming_club_supporter_subscription_renewals",
		map[string]interface{}{
			"Username": acc.Username(),
			"Renewals": clubRenewals,
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
