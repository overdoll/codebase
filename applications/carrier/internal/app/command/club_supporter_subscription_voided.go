package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/carrier/internal/domain/mailing"
)

type ClubSupporterSubscriptionVoided struct {
	AccountId      string
	ClubId         string
	SubscriptionId string
	TransactionId  string
}

type ClubSupporterSubscriptionVoidedHandler struct {
	mr     mailing.Repository
	eva    EvaService
	stella StellaService
}

func NewClubSupporterSubscriptionVoidedHandler(mr mailing.Repository, eva EvaService, stella StellaService) ClubSupporterSubscriptionVoidedHandler {
	return ClubSupporterSubscriptionVoidedHandler{mr: mr, eva: eva, stella: stella}
}

func (h ClubSupporterSubscriptionVoidedHandler) Handle(ctx context.Context, cmd ClubSupporterSubscriptionVoided) error {

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return errors.Wrap(err, "failed to get account")
	}

	template, err := mailing.NewTemplate("voided", "\n  <html>\n    <head>\n      <title></title>\n    </head>\n    <body>\n  \n            voided\n          </a>\n    </body>\n  </html>\n", "voided")

	if err != nil {
		return err
	}

	recipient, err := mailing.NewRecipientFromIdentifier(acc)

	if err != nil {
		return err
	}

	return h.mr.SendEmail(ctx, recipient, template)
}
