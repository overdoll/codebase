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
				CancellationReasonId:               input.CancellationReasonID.GetID(),
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CancelAccountClubSupporterSubscriptionPayload{
		ClubSupporterSubscription: types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result),
	}, nil
}

func (r *MutationResolver) RefundAccountTransaction(ctx context.Context, input types.RefundAccountTransactionInput) (*types.RefundAccountTransactionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	transaction, err := r.App.Commands.RefundAccountTransaction.
		Handle(
			ctx,
			command.RefundAccountTransaction{
				Principal:     principal.FromContext(ctx),
				TransactionId: input.AccountTransactionID.GetID(),
				Amount:        uint64(input.Amount),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.RefundAccountTransactionPayload{
		AccountTransaction: types.MarshalAccountTransactionToGraphQL(ctx, transaction),
	}, nil
}

func (r *MutationResolver) GenerateRefundAmountForAccountTransaction(ctx context.Context, input types.GenerateRefundAmountForAccountTransactionInput) (*types.GenerateRefundAmountForAccountTransactionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.GenerateProratedRefundAmountForAccountTransaction.
		Handle(
			ctx,
			command.GenerateProratedRefundAmountForAccountTransaction{
				Principal:     principal.FromContext(ctx),
				TransactionId: input.AccountTransactionID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.GenerateRefundAmountForAccountTransactionPayload{
		RefundAmount: &types.RefundAmount{
			ProratedAmount: int(result.ProratedAmount()),
			MaximumAmount:  int(result.MaxAmount()),
			Currency:       graphql.MarshalCurrencyToGraphQL(ctx, result.Currency()),
		},
	}, nil
}

func (r *MutationResolver) GenerateClubSupporterPaymentReceiptFromAccountTransaction(ctx context.Context, input types.GenerateClubSupporterPaymentReceiptFromAccountTransactionInput) (*types.GenerateClubSupporterPaymentReceiptFromAccountTransactionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory.
		Handle(
			ctx,
			command.GenerateClubSupporterPaymentReceiptFromAccountTransaction{
				Principal:            principal.FromContext(ctx),
				AccountTransactionId: input.TransactionID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	link := graphql.URI(result.Link())

	return &types.GenerateClubSupporterPaymentReceiptFromAccountTransactionPayload{
		Link: &link,
	}, nil
}

func (r *MutationResolver) GenerateClubSupporterRefundReceiptFromAccountTransaction(ctx context.Context, input types.GenerateClubSupporterRefundReceiptFromAccountTransactionInput) (*types.GenerateClubSupporterRefundReceiptFromAccountTransactionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.GenerateClubSupporterRefundReceiptFromAccountTransactionHistory.
		Handle(
			ctx,
			command.GenerateClubSupporterRefundReceiptFromAccountTransaction{
				Principal:                 principal.FromContext(ctx),
				AccountTransactionId:      input.TransactionID.GetID(),
				AccountTransactionEventId: input.TransactionEventID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	link := graphql.URI(result.Link())

	return &types.GenerateClubSupporterRefundReceiptFromAccountTransactionPayload{
		Link: &link,
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
				AccountClubSupporterSubscriptionId: input.ClubSupporterSubscriptionID.GetID(),
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

func (r *MutationResolver) DeleteAccountSavedPaymentMethod(ctx context.Context, input types.DeleteAccountSavedPaymentMethodInput) (*types.DeleteAccountSavedPaymentMethodPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.DeleteAccountSavedPaymentMethod.
		Handle(
			ctx,
			command.DeleteAccountSavedPaymentMethod{
				Principal:                   principal.FromContext(ctx),
				AccountId:                   input.SavedPaymentMethodID.GetCompositePartID(1),
				AccountSavedPaymentMethodId: input.SavedPaymentMethodID.GetCompositePartID(0),
			},
		); err != nil {
		return nil, err
	}

	return &types.DeleteAccountSavedPaymentMethodPayload{
		DeletedAccountSavedPaymentMethodID: input.SavedPaymentMethodID,
	}, nil
}

func (r *MutationResolver) CancelActiveSupporterSubscriptionsForClub(ctx context.Context, input types.CancelActiveSupporterSubscriptionsForClubInput) (*types.CancelActiveSupporterSubscriptionsForClubPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.CancelActiveSupporterSubscriptionsForClub.
		Handle(
			ctx,
			command.CancelActiveSupporterSubscriptionsForClub{
				Principal: principal.FromContext(ctx),
				ClubId:    input.ClubID.GetID(),
			},
		); err != nil {
		return nil, err
	}

	return &types.CancelActiveSupporterSubscriptionsForClubPayload{
		Club: &types.Club{ID: input.ClubID},
	}, nil
}
