package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/billing"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
)

type GenerateCCBillClubSupporterPaymentLink struct {
	Principal           *principal.Principal
	ClubId              string
	SavePaymentForLater bool
}

type GenerateCCBillClubSupporterPaymentLinkHandler struct {
	cr club.Repository
	br billing.Repository
}

func NewGenerateCCBillClubSupporterPaymentLinkHandler(cr club.Repository, br billing.Repository) GenerateCCBillClubSupporterPaymentLinkHandler {
	return GenerateCCBillClubSupporterPaymentLinkHandler{cr: cr, br: br}
}

func (h GenerateCCBillClubSupporterPaymentLinkHandler) Handle(ctx context.Context, cmd GenerateCCBillClubSupporterPaymentLink) (*billing.CCBillClubSupporterPaymentLink, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	paymentLink, err := billing.NewCCBillClubSupporterPaymentLink(cmd.Principal, clb.ID(), cmd.SavePaymentForLater)

	if err != nil {
		return nil, err
	}

	return paymentLink, nil
}
