package mutations

import (
	"context"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) GenerateCCBillClubSupporterPaymentLink(ctx context.Context, input types.GenerateCCBillClubSupporterPaymentLinkInput) (*types.GenerateCCBillClubSupporterPaymentLinkPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	pst, err := r.App.Commands.GenerateCCBillClubSupporterPaymentLink.
		Handle(
			ctx,
			command.GenerateCCBillClubSupporterPaymentLink{
				Principal:           principal.FromContext(ctx),
				ClubId:              input.ClubID.GetID(),
				SavePaymentForLater: input.SavePaymentDetailsForLater,
			},
		)

	if err != nil {
		return nil, err
	}

	link, err := pst.GeneratePaymentLink()

	if err != nil {
		return nil, err
	}

	return &types.GenerateCCBillClubSupporterPaymentLinkPayload{
		CcbillPaymentLink: &types.CCBillPaymentLink{Link: link},
	}, nil
}
