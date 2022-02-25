package types

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/paging"
)

func MarshalCancellationReasonsToGraphQLConnection(ctx context.Context, results []*cancellation.Reason, cursor *paging.Cursor) *CancellationReasonConnection {
	return nil
}

func MarshalCancellationReasonToGraphQL(ctx context.Context, result *cancellation.Reason) *CancellationReason {
	return nil
}

func MarshalPaymentMethodToGraphQL(ctx context.Context, result *billing.PaymentMethod) *PaymentMethod {
	return nil
}

func MarshalAccountClubSupporterSubscriptionToGraphQL(ctx context.Context, result *billing.AccountClubSupporterSubscription) *AccountClubSupporterSubscription {
	return nil
}

func MarshalAccountClubSupporterSubscriptionToGraphQLConnection(ctx context.Context, results []*billing.AccountClubSupporterSubscription, cursor *paging.Cursor) *AccountClubSupporterSubscriptionConnection {
	return nil
}

func MarshalAccountSavedPaymentMethodsToGraphQLConnection(ctx context.Context, results []*billing.SavedPaymentMethod, cursor *paging.Cursor) *AccountSavedPaymentMethodConnection {
	return nil
}

func MarshalAccountTransactionHistoryToGraphQLConnection(ctx context.Context, results []*billing.AccountTransactionHistory, cursor *paging.Cursor) *AccountTransactionHistoryConnection {
	return nil
}

func MarshalCurrencyToGraphQL(ctx context.Context, result billing.Currency) Currency {

	var currency Currency

	switch result {
	case billing.USD:
		currency = CurrencyUsd
	case billing.CAD:
		currency = CurrencyCad
	case billing.AUD:
		currency = CurrencyAud
	case billing.JPY:
		currency = CurrencyJpy
	case billing.GBP:
		currency = CurrencyGbp
	case billing.EUR:
		currency = CurrencyEur
	}

	return currency
}
