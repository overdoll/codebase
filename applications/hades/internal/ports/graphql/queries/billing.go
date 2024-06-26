package queries

import (
	"context"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r QueryResolver) AccountClubSupporterSubscription(ctx context.Context, reference string) (types.AccountClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionById.Handle(ctx, query.AccountClubSupporterSubscriptionById{
		Principal: principal.FromContext(ctx),
		Id:        reference,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}

func (r QueryResolver) AccountTransaction(ctx context.Context, reference string) (*types.AccountTransaction, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountTransactionById.Handle(ctx, query.AccountTransactionById{
		Principal: principal.FromContext(ctx),
		Id:        reference,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountTransactionToGraphQL(ctx, result), nil
}

func (r QueryResolver) CcbillSubscriptionDetails(ctx context.Context, ccbillSubscriptionID string) (*types.CCBillSubscriptionDetails, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, ccbillResult, err := r.App.Queries.CCBillSubscriptionDetails.Handle(ctx, query.CCBillSubscriptionDetails{
		Principal:            principal.FromContext(ctx),
		CCBillSubscriptionId: ccbillSubscriptionID,
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
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
		SubscriptionInitialPrice:   int(result.SubscriptionInitialPrice()),
		SubscriptionRecurringPrice: int(result.SubscriptionRecurringPrice()),
		SubscriptionCurrency:       graphql.MarshalCurrencyToGraphQL(ctx, result.SubscriptionCurrency()),
		BilledInitialPrice:         int(result.BilledInitialPrice()),
		BilledRecurringPrice:       int(result.BilledRecurringPrice()),
		BilledCurrency:             graphql.MarshalCurrencyToGraphQL(ctx, result.BilledCurrency()),
		AccountingInitialPrice:     int(result.AccountingInitialPrice()),
		AccountingRecurringPrice:   int(result.AccountingRecurringPrice()),
		AccountingCurrency:         graphql.MarshalCurrencyToGraphQL(ctx, result.AccountingCurrency()),
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
