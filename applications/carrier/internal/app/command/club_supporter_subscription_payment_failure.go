package command

import (
	"context"
	"github.com/pkg/errors"
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
		return errors.Wrap(err, "failed to get account")
	}

	template, err := mailing.NewTemplate("payment failure", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            failure\n          </a>\n    </body>\n  </html>\n", "failure")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
