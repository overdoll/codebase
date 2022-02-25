package queries

import (
	"context"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r QueryResolver) CcbillSubscriptionDetails(ctx context.Context, ccbillSubscriptionID string) (*types.CCBillSubscriptionDetails, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, ccbillResult, err := r.App.Queries.CCBillSubscriptionDetails.Handle(ctx, query.CCBillSubscriptionDetails{
		Principal:            principal.FromContext(ctx),
		CCBillSubscriptionId: ccbillSubscriptionID,
	})

	if err != nil {

		if err == billing.ErrCCBillSubscriptionNotFound {
			return nil, nil
		}

		return nil, err
	}

	var ccbillSubscriptionStatus types.CCBillSubscriptionStatus

	if ccbillResult.SubscriptionStatus() == ccbill.Inactive {
		ccbillSubscriptionStatus = types.CCBillSubscriptionStatusInactive
	} else if ccbillResult.SubscriptionStatus() == ccbill.ActiveAndCancelled {
		ccbillSubscriptionStatus = types.CCBillSubscriptionStatusActiveAndCancelled
	} else if ccbillResult.SubscriptionStatus() == ccbill.ActiveAndNotCancelled {
		ccbillSubscriptionStatus = types.CCBillSubscriptionStatusActiveAndNotCancelled
	}

	return &types.CCBillSubscriptionDetails{
		ID:            relay.NewID(types.CCBillSubscriptionDetails{}, result.CCBillSubscriptionId()),
		Status:        ccbillSubscriptionStatus,
		PaymentMethod: types.MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
		Club: &types.Club{
			ID: relay.NewID(types.Club{}, result.ClubId()),
		},
		Account: &types.Account{
			ID: relay.NewID(types.Account{}, result.AccountId()),
		},
		SubscriptionInitialPrice:   result.SubscriptionInitialPrice(),
		SubscriptionRecurringPrice: result.SubscriptionRecurringPrice(),
		SubscriptionCurrency:       types.MarshalCurrencyToGraphQL(ctx, result.SubscriptionCurrency()),
		BilledInitialPrice:         result.BilledInitialPrice(),
		BilledRecurringPrice:       result.BilledRecurringPrice(),
		BilledCurrency:             types.MarshalCurrencyToGraphQL(ctx, result.BilledCurrency()),
		AccountingInitialPrice:     result.AccountingInitialPrice(),
		AccountingRecurringPrice:   result.AccountingRecurringPrice(),
		AccountingCurrency:         types.MarshalCurrencyToGraphQL(ctx, result.AccountingCurrency()),
		IsRecurring:                ccbillResult.RecurringSubscription(),
		TimesRebilled:              ccbillResult.TimesRebilled(),
		ChargebacksIssued:          ccbillResult.ChargebacksIssued(),
		RefundsIssued:              ccbillResult.RefundsIssued(),
		VoidsIssued:                ccbillResult.VoidsIssued(),
		SignupDate:                 ccbillResult.SignupDate(),
		ExpirationDate:             ccbillResult.ExpirationDate(),
		CancelDate:                 ccbillResult.CancelDate(),
		UpdatedAt:                  result.UpdatedAt(),
	}, nil
}

func (r QueryResolver) AccountClubSupporterSubscriptionFinalized(ctx context.Context, locker string) (*types.AccountClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubSupporterSubscriptionFinalized.Handle(ctx, query.ClubSupporterSubscriptionFinalized{
		Principal: principal.FromContext(ctx),
		Locker:    locker,
	})

	if err != nil {

		if err == billing.ErrAccountClubSupportSubscriptionNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}
