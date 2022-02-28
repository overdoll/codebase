package types

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

func MarshalCancellationReasonsToGraphQLConnection(ctx context.Context, results []*cancellation.Reason, cursor *paging.Cursor) *CancellationReasonConnection {

	var cancellationReasons []*CancellationReasonEdge

	conn := &CancellationReasonConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: cancellationReasons,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *cancellation.Reason

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *cancellation.Reason {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *cancellation.Reason {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		cancellationReasons = append(cancellationReasons, &CancellationReasonEdge{
			Node:   MarshalCancellationReasonToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = cancellationReasons

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalCancellationReasonToGraphQL(ctx context.Context, result *cancellation.Reason) *CancellationReason {

	var titleTranslations []*Translation

	for _, val := range result.Title().Translations() {
		titleTranslations = append(titleTranslations, &Translation{
			Language: &Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &CancellationReason{
		ID:                relay.NewID(CancellationReason{}, result.ID()),
		Reference:         result.ID(),
		Title:             result.Title().Translate(passport.FromContext(ctx).Language(), result.ID()),
		TitleTranslations: titleTranslations,
		Deprecated:        result.Deprecated(),
	}
}

func MarshalPaymentMethodToGraphQL(ctx context.Context, result *billing.PaymentMethod) *PaymentMethod {

	var card *Card

	if result.Card() != nil {

		var cardType CardType

		if result.Card().Type() == billing.Mastercard {
			cardType = CardTypeMastercard
		}

		if result.Card().Type() == billing.Visa {
			cardType = CardTypeVisa
		}

		if result.Card().Type() == billing.Discover {
			cardType = CardTypeDiscover
		}

		if result.Card().Type() == billing.JCB {
			cardType = CardTypeJcb
		}

		if result.Card().Type() == billing.Amex {
			cardType = CardTypeAmex
		}

		card = &Card{
			Last4:      result.Card().Last4(),
			Expiration: result.Card().Expiration(),
			Type:       cardType,
		}
	}

	var billingAddress *BillingAddress

	if result.BillingAddress() != nil {
		billingAddress = &BillingAddress{
			AddressLine1: result.BillingAddress().AddressLine1(),
			City:         result.BillingAddress().City(),
			State:        result.BillingAddress().State(),
			Country:      result.BillingAddress().Country(),
			PostalCode:   result.BillingAddress().PostalCode(),
		}
	}

	var billingContact *BillingContact

	if result.BillingContact() != nil {
		billingContact = &BillingContact{
			FirstName:   result.BillingContact().FirstName(),
			LastName:    result.BillingContact().LastName(),
			Email:       result.BillingContact().Email(),
			PhoneNumber: result.BillingContact().PhoneNumber(),
		}
	}

	return &PaymentMethod{
		Card:           card,
		BillingAddress: billingAddress,
		BillingContact: billingContact,
	}
}

func MarshalAccountClubSupporterSubscriptionToGraphQL(ctx context.Context, result *billing.AccountClubSupporterSubscription) *AccountClubSupporterSubscription {

	var cancellationReason *CancellationReason

	if result.CancellationReasonId() != nil {
		cancellationReason = &CancellationReason{
			ID: relay.NewID(CancellationReason{}, *result.CancellationReasonId()),
		}
	}

	var status AccountClubSupporterSubscriptionStatus

	if result.Status() == billing.Active {
		status = AccountClubSupporterSubscriptionStatusActive
	}

	if result.Status() == billing.Cancelled {
		status = AccountClubSupporterSubscriptionStatusCancelled
	}

	return &AccountClubSupporterSubscription{
		ID: relay.NewID(AccountClubSupporterSubscription{}, result.AccountId(), result.ClubId(), result.Id()),
		Account: &Account{
			ID: relay.NewID(Account{}, result.AccountId()),
		},
		Club: &Club{
			ID: relay.NewID(Club{}, result.ClubId()),
		},
		Status:          status,
		SupporterSince:  result.SupporterSince(),
		LastBillingDate: result.LastBillingDate(),
		NextBillingDate: result.NextBillingDate(),
		CancelledAt:     result.CancelledAt(),
		BillingAmount:   result.BillingAmount(),
		BillingCurrency: MarshalCurrencyToGraphQL(ctx, result.BillingCurrency()),
		PaymentMethod:   MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
		CcbillSubscription: &CCBillSubscription{
			PaymentMethod:        "Credit Card",
			CcbillSubscriptionID: result.CCBillSubscriptionId(),
			Email:                result.PaymentMethod().BillingContact().Email(),
		},
		UpdatedAt:          result.UpdatedAt(),
		CancellationReason: cancellationReason,
	}
}

func MarshalAccountClubSupporterSubscriptionToGraphQLConnection(ctx context.Context, results []*billing.AccountClubSupporterSubscription, cursor *paging.Cursor) *AccountClubSupporterSubscriptionConnection {

	var subscriptions []*AccountClubSupporterSubscriptionEdge

	conn := &AccountClubSupporterSubscriptionConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: subscriptions,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *billing.AccountClubSupporterSubscription

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *billing.AccountClubSupporterSubscription {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *billing.AccountClubSupporterSubscription {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		subscriptions = append(subscriptions, &AccountClubSupporterSubscriptionEdge{
			Node:   MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = subscriptions

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountSavedPaymentMethodToGraphQL(ctx context.Context, result *billing.SavedPaymentMethod) *AccountSavedPaymentMethod {
	return &AccountSavedPaymentMethod{
		ID: relay.NewID(AccountSavedPaymentMethod{}, result.AccountId(), result.Id()),
		Account: &Account{
			ID: relay.NewID(Account{}, result.AccountId()),
		},
		PaymentMethod: MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
		CcbillSubscription: &CCBillSubscription{
			PaymentMethod:        "Credit Card",
			CcbillSubscriptionID: result.CCBillSubscriptionId(),
			Email:                result.PaymentMethod().BillingContact().Email(),
		},
		UpdatedAt: result.UpdatedAt(),
	}
}

func MarshalAccountSavedPaymentMethodsToGraphQLConnection(ctx context.Context, results []*billing.SavedPaymentMethod, cursor *paging.Cursor) *AccountSavedPaymentMethodConnection {

	var payments []*AccountSavedPaymentMethodEdge

	conn := &AccountSavedPaymentMethodConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: payments,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *billing.SavedPaymentMethod

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *billing.SavedPaymentMethod {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *billing.SavedPaymentMethod {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		payments = append(payments, &AccountSavedPaymentMethodEdge{
			Node:   MarshalAccountSavedPaymentMethodToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = payments

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountTransactionHistoryToGraphQL(ctx context.Context, result *billing.AccountTransactionHistory) AccountTransactionHistory {

	var accountTransactionHistory AccountTransactionHistory

	var tp AccountTransactionType

	var club *Club

	if result.SupportedClubId() != nil {
		tp = AccountTransactionTypeClubSupporterSubscription
		club = &Club{
			ID: relay.NewID(Club{}, *result.SupportedClubId()),
		}
	}

	account := &Account{
		ID: relay.NewID(Account{}, result.AccountId()),
	}

	id := relay.NewID(AccountNewTransactionHistory{}, result.Id())

	subscriptionDetails := &CCBillSubscriptionTransaction{
		CcbillSubscriptionID: result.CCBillSubscriptionId(),
	}

	if result.Transaction() == billing.New {
		accountTransactionHistory = AccountNewTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			Amount:                        *result.Amount(),
			Currency:                      MarshalCurrencyToGraphQL(ctx, *result.Currency()),
			BilledAtDate:                  *result.BilledAtDate(),
			NextBillingDate:               *result.NextBillingDate(),
			PaymentMethod:                 MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			SupportedClub:                 club,
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Invoice {
		accountTransactionHistory = AccountInvoiceTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			Amount:                        *result.Amount(),
			Currency:                      MarshalCurrencyToGraphQL(ctx, *result.Currency()),
			BilledAtDate:                  *result.BilledAtDate(),
			NextBillingDate:               *result.NextBillingDate(),
			PaymentMethod:                 MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			SupportedClub:                 club,
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Void {
		accountTransactionHistory = AccountVoidTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			Amount:                        *result.Amount(),
			Currency:                      MarshalCurrencyToGraphQL(ctx, *result.Currency()),
			SupportedClub:                 club,
			CcbillReason:                  result.CCBillReason(),
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Chargeback {
		accountTransactionHistory = AccountChargebackTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			Amount:                        *result.Amount(),
			Currency:                      MarshalCurrencyToGraphQL(ctx, *result.Currency()),
			SupportedClub:                 club,
			PaymentMethod:                 MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Cancel {
		accountTransactionHistory = AccountCancelledTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			SupportedClub:                 club,
			CcbillReason:                  result.CCBillReason(),
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Expired {
		accountTransactionHistory = AccountExpiredTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			SupportedClub:                 club,
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Refund {
		accountTransactionHistory = AccountRefundTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			Amount:                        *result.Amount(),
			Currency:                      MarshalCurrencyToGraphQL(ctx, *result.Currency()),
			SupportedClub:                 club,
			PaymentMethod:                 MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			CcbillReason:                  result.CCBillReason(),
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Failed {
		accountTransactionHistory = AccountFailedTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			NextRetryDate:                 *result.BillingFailureNextRetryDate(),
			SupportedClub:                 club,
			CcbillErrorCode:               result.CCBillErrorCode(),
			CcbillErrorText:               result.CCBillErrorText(),
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	if result.Transaction() == billing.Reactivate {
		accountTransactionHistory = AccountReactivatedTransactionHistory{
			ID:                            id,
			Type:                          tp,
			Account:                       account,
			NextBillingDate:               *result.NextBillingDate(),
			SupportedClub:                 club,
			CcbillSubscriptionTransaction: subscriptionDetails,
			Timestamp:                     result.Timestamp(),
		}
	}

	return accountTransactionHistory
}

func MarshalAccountTransactionHistoryToGraphQLConnection(ctx context.Context, results []*billing.AccountTransactionHistory, cursor *paging.Cursor) *AccountTransactionHistoryConnection {
	var transactions []*AccountTransactionHistoryEdge

	conn := &AccountTransactionHistoryConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: transactions,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *billing.AccountTransactionHistory

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *billing.AccountTransactionHistory {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *billing.AccountTransactionHistory {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		transactions = append(transactions, &AccountTransactionHistoryEdge{
			Node:   MarshalAccountTransactionHistoryToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = transactions

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
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