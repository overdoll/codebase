package command

import (
	"context"
	"github.com/pkg/errors"
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

	template, err := mailing.NewTemplate("refunded", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            refunded\n          </a>\n    </body>\n  </html>\n", "refunded")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
