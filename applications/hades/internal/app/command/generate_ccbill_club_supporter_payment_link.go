package command

import (
	"context"
	"errors"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type GenerateCCBillClubSupporterPaymentLink struct {
	Principal           *principal.Principal
	ClubId              string
	SavePaymentForLater bool
}

type GenerateCCBillClubSupporterPaymentLinkHandler struct {
	br     billing.Repository
	stella StellaService
}

func NewGenerateCCBillClubSupporterPaymentLinkHandler(br billing.Repository, stella StellaService) GenerateCCBillClubSupporterPaymentLinkHandler {
	return GenerateCCBillClubSupporterPaymentLinkHandler{br: br, stella: stella}
}

func (h GenerateCCBillClubSupporterPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillClubSupporterPaymentLink) (*ccbill.ClubSupporterPaymentLink, error) {

	allowed, err := h.stella.CanAccountBecomeClubSupporter(ctx, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	if !allowed {
		return nil, errors.New("cannot generate a link - club not accessible")
	}

	paymentLink, err := ccbill.NewCCBillClubSupporterPaymentLink(cmd.Principal, cmd.ClubId, cmd.SavePaymentForLater)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
