package command

import (
	"context"
	"github.com/pkg/errors"
	"time"

	"overdoll/applications/carrier/internal/domain/mailing"
)

type NewClubSupporterSubscription struct {
	AccountId       string
	ClubId          string
	SubscriptionId  string
	Amount          int64
	Currency        string
	BillingDate     time.Time
	NextBillingDate time.Time
}

type NewClubSupporterSubscriptionHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewNewClubSupporterSubscriptionHandler(mr mailing.Repository, eva EvaService, stella StellaService) NewClubSupporterSubscriptionHandler {
	return NewClubSupporterSubscriptionHandler{mr: mr, eva: eva, stella: stella}
}

func (h NewClubSupporterSubscriptionHandler) Handle(ctx context.Context, cmd ConfirmAccountEmail) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	template, err := mailing.NewTemplate("new subscription", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            new subscription\n          </a>\n    </body>\n  </html>\n", "new subscription")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
