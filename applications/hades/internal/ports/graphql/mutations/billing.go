package mutations

import (
	"context"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
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
			command.GenerateCCBillClubSupportPaymentLink{
				Principal:           principal.FromContext(ctx),
				ClubId:              input.ClubID.GetID(),
				SavePaymentForLater: input.SavePaymentDetailsForLater,
				Currency:            input.Currency.String(),
			},
		)

	if err != nil {
		return nil, err
	}

	link, err := pst.GenerateLink()

	if err != nil {
		return nil, err
	}

	url := graphql.URI(*link)

	return &types.GenerateCCBillClubSupporterPaymentLinkPayload{
		PaymentLink: &url,
	}, nil
}

func (r *MutationResolver) BecomeClubSupporterWithAccountSavedPaymentMethod(ctx context.Context, input types.BecomeClubSupporterWithAccountSavedPaymentMethodInput) (*types.BecomeClubSupporterWithAccountSavedPaymentMethodPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	ccbillTransactionToken, err := r.App.Commands.BecomeClubSupporterWithAccountSavedPaymentMethod.
		Handle(
			ctx,
			command.BecomeClubSupporterWithAccountSavedPaymentMethod{
				Principal:                   principal.FromContext(ctx),
				Passport:                    passport.FromContext(ctx),
				Currency:                    input.Currency.String(),
				ClubId:                      input.ClubID.GetID(),
				AccountSavedPaymentMethodId: input.SavedPaymentMethodID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.BecomeClubSupporterWithAccountSavedPaymentMethodPayload{
		CcbillTransactionToken: ccbillTransactionToken,
	}, nil
}

func (r *MutationResolver) CancelAccountClubSupporterSubscription(ctx context.Context, input types.CancelAccountClubSupporterSubscriptionInput) (*types.CancelAccountClubSupporterSubscriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.CancelAccountClubSupporterSubscription.
		Handle(
			ctx,
			command.CancelAccountClubSupporterSubscription{
				Principal:                          principal.FromContext(ctx),
				ClubId:                             input.ClubSupporterSubscriptionID.GetCompositePartID(0),
				AccountId:                          input.ClubSupporterSubscriptionID.GetCompositePartID(1),
				CancellationReasonId:               input.CancellationReasonID.GetID(),
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetCompositePartID(2),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CancelAccountClubSupporterSubscriptionPayload{
		ClubSupporterSubscription: types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result),
	}, nil
}

func (r *MutationResolver) VoidOrRefundAccountClubSupporterSubscription(ctx context.Context, input types.VoidOrRefundAccountClubSupporterSubscriptionInput) (*types.VoidOrRefundAccountClubSupporterSubscriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.VoidOrRefundAccountClubSupporterSubscription.
		Handle(
			ctx,
			command.VoidOrRefundAccountClubSupporterSubscription{
				Principal:                          principal.FromContext(ctx),
				ClubId:                             input.ClubSupporterSubscriptionID.GetCompositePartID(0),
				AccountId:                          input.ClubSupporterSubscriptionID.GetCompositePartID(1),
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetCompositePartID(2),
				Amount:                             input.Amount,
			},
		); err != nil {
		return nil, err
	}

	return &types.VoidOrRefundAccountClubSupporterSubscriptionPayload{
		DeletedClubSupporterSubscriptionID: input.ClubSupporterSubscriptionID,
	}, nil
}

func (r *MutationResolver) ExtendAccountClubSupporterSubscription(ctx context.Context, input types.ExtendAccountClubSupporterSubscriptionInput) (*types.ExtendAccountClubSupporterSubscriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.ExtendAccountClubSupporterSubscription.
		Handle(
			ctx,
			command.ExtendAccountClubSupporterSubscription{
				Principal:                          principal.FromContext(ctx),
				ClubId:                             input.ClubSupporterSubscriptionID.GetCompositePartID(0),
				AccountId:                          input.ClubSupporterSubscriptionID.GetCompositePartID(1),
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetCompositePartID(2),
				Days:                               input.Days,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.ExtendAccountClubSupporterSubscriptionPayload{
		ClubSupporterSubscription: types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result),
	}, nil
}

func (r *MutationResolver) GenerateRefundAmountForAccountClubSupporterSubscription(ctx context.Context, input types.GenerateRefundAmountForAccountClubSupporterSubscriptionInput) (*types.GenerateRefundAmountForAccountClubSupporterSubscriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.GenerateProratedRefundAmountForAccountClubSubscription.
		Handle(
			ctx,
			command.GenerateProratedRefundAmountForAccountClubSubscription{
				Principal:                          principal.FromContext(ctx),
				ClubId:                             input.ClubSupporterSubscriptionID.GetCompositePartID(0),
				AccountId:                          input.ClubSupporterSubscriptionID.GetCompositePartID(1),
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetCompositePartID(2),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.GenerateRefundAmountForAccountClubSupporterSubscriptionPayload{
		RefundAmount: &types.RefundAmount{
			ProratedAmount: result.ProratedAmount(),
			MaximumAmount:  result.MaxAmount(),
			Currency:       types.MarshalCurrencyToGraphQL(ctx, result.Currency()),
		},
	}, nil
}

func (r *MutationResolver) DeleteAccountSavedPaymentMethod(ctx context.Context, input types.DeleteAccountSavedPaymentMethodInput) (*types.DeleteAccountSavedPaymentMethodPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.DeleteAccountSavedPaymentMethod.
		Handle(
			ctx,
			command.DeleteAccountSavedPaymentMethod{
				Principal:                   principal.FromContext(ctx),
				AccountId:                   input.SavedPaymentMethodID.GetCompositePartID(0),
				AccountSavedPaymentMethodId: input.SavedPaymentMethodID.GetCompositePartID(1),
			},
		); err != nil {
		return nil, err
	}

	return &types.DeleteAccountSavedPaymentMethodPayload{
		DeletedAccountSavedPaymentMethodID: input.SavedPaymentMethodID,
	}, nil
}

func (r *MutationResolver) GenerateClubSupporterReceiptFromAccountTransactionHistory(ctx context.Context, input types.GenerateClubSupporterReceiptFromAccountTransactionHistoryInput) (*types.GenerateClubSupporterReceiptFromAccountTransactionHistoryPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.GenerateClubSupporterReceiptFromAccountTransactionHistory.
		Handle(
			ctx,
			command.GenerateClubSupporterReceiptFromAccountTransactionHistory{
				Principal:                   principal.FromContext(ctx),
				AccountTransactionHistoryId: input.TransactionHistoryID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	link := graphql.URI(result.Link())

	return &types.GenerateClubSupporterReceiptFromAccountTransactionHistoryPayload{
		Link: &link,
	}, nil
}
