package command

import (
	"context"
	"errors"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type GenerateCCBillClubSupportPaymentLink struct {
	Principal           *principal.Principal
	ClubId              string
	SavePaymentForLater bool
}

type GenerateCCBillClubSupportPaymentLinkHandler struct {
	br     billing.Repository
	stella StellaService
}

func NewGenerateCCBillClubSupportPaymentLinkHandler(br billing.Repository, stella StellaService) GenerateCCBillClubSupportPaymentLinkHandler {
	return GenerateCCBillClubSupportPaymentLinkHandler{br: br, stella: stella}
}

func (h GenerateCCBillClubSupportPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillClubSupportPaymentLink) (*ccbill.FlexFormsClubSupporterPaymentLink, error) {

	allowed, err := h.stella.CanAccountBecomeClubSupporter(ctx, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	if !allowed {
		return nil, errors.New("cannot generate a link - club not accessible")
	}

	// check to make sure an existing subscription doesn't already exist for this club + account combination
	subscription, err := h.br.HasExistingAccountClubSupporterSubscription(ctx, cmd.Principal.AccountId(), cmd.ClubId)

	if err != nil {
		return nil, err
	}

	if subscription {
		return nil, errors.New("existing subscription found")
	}

	paymentLink, err := ccbill.NewFlexFormsClubSupporterPaymentLink(cmd.Principal, cmd.ClubId, cmd.SavePaymentForLater)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
