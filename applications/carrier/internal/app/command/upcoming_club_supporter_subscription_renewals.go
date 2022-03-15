package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/mailing"
	"time"
)

type UpcomingClubSupporterSubscriptionRenewals struct {
	AccountId string
	Renewals  []struct {
		ClubId         string
		SubscriptionId string
		Amount         int64
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

	template, err := mailing.NewTemplate("upcoming renewals", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            upcoming renewals\n          </a>\n    </body>\n  </html>\n", "upcoming renewals")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
