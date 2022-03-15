package command

import (
	"context"
	"github.com/pkg/errors"
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
		return errors.Wrap(err, "failed to get account")
	}

	template, err := mailing.NewTemplate("cancelled", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            cancelled\n          </a>\n    </body>\n  </html>\n", "cancelled")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
