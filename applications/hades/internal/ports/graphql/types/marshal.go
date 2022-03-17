package types

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/graphql"
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

func MarshalExpiredAccountClubSupporterSubscriptionToGraphQL(ctx context.Context, result *billing.ExpiredAccountClubSupporterSubscription) *ExpiredAccountClubSupporterSubscription {
	return &ExpiredAccountClubSupporterSubscription{
		ID: relay.NewID(ExpiredAccountClubSupporterSubscription{}, result.AccountId(), result.ClubId()),
		Account: &Account{
			ID: relay.NewID(Account{}, result.AccountId()),
		},
		Club: &Club{
			ID: relay.NewID(Club{}, result.ClubId()),
		},
		SupporterSince: result.SupporterSince(),
		ExpiredAt:      result.CancelledAt(),
		CancelledAt:    result.ExpiredAt(),
	}
}

func MarshalAccountClubSupporterSubscriptionToGraphQL(ctx context.Context, result *billing.AccountClubSupporterSubscription) AccountClubSupporterSubscription {

	var cancellationReason *CancellationReason

	if result.CancellationReasonId() != nil {
		cancellationReason = &CancellationReason{
			ID: relay.NewID(CancellationReason{}, *result.CancellationReasonId()),
		}
	}

	var ccbillSub *CCBillSubscription

	if result.CCBillSubscriptionId() != nil {
		support := result.GetSupport()
		ccbillSub = &CCBillSubscription{
			PaymentMethod:        support.LookupType(),
			CcbillSubscriptionID: support.SubscriptionId(),
			Email:                support.Email(),
			Link:                 graphql.URI(support.GenerateUrl()),
		}
	}

	var billingError *AccountClubSupporterSubscriptionBillingError

	if result.FailedAt() != nil {

		declineError := MarshalCCBillDeclineCodeToGraphQL(ctx, *result.CCBillErrorCode())

		billingError = &AccountClubSupporterSubscriptionBillingError{
			FailedAt:           *result.FailedAt(),
			CcbillErrorText:    result.CCBillErrorText(),
			CcbillErrorCode:    result.CCBillErrorCode(),
			CcbillDeclineError: &declineError,
			NextRetryDate:      *result.BillingFailureNextRetryDate(),
		}
	}

	if result.Status() == billing.Active {
		return &AccountActiveClubSupporterSubscription{
			ID:        relay.NewID(AccountActiveClubSupporterSubscription{}, result.AccountId(), result.ClubId(), result.Id()),
			Reference: result.Id(),
			Account: &Account{
				ID: relay.NewID(Account{}, result.AccountId()),
			},
			Club: &Club{
				ID: relay.NewID(Club{}, result.ClubId()),
			},
			BillingAmount:      int(result.BillingAmount()),
			BillingCurrency:    MarshalCurrencyToGraphQL(ctx, result.BillingCurrency()),
			SupporterSince:     result.SupporterSince(),
			LastBillingDate:    result.LastBillingDate(),
			NextBillingDate:    result.NextBillingDate(),
			PaymentMethod:      MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			CcbillSubscription: ccbillSub,
			UpdatedAt:          result.UpdatedAt(),
			BillingError:       billingError,
		}
	}

	if result.Status() == billing.Cancelled {
		return &AccountCancelledClubSupporterSubscription{
			ID:        relay.NewID(AccountCancelledClubSupporterSubscription{}, result.AccountId(), result.ClubId(), result.Id()),
			Reference: result.Id(),
			Account: &Account{
				ID: relay.NewID(Account{}, result.AccountId()),
			},
			Club: &Club{
				ID: relay.NewID(Club{}, result.ClubId()),
			},
			BillingAmount:      int(result.BillingAmount()),
			BillingCurrency:    MarshalCurrencyToGraphQL(ctx, result.BillingCurrency()),
			SupporterSince:     result.SupporterSince(),
			CancelledAt:        *result.CancelledAt(),
			EndDate:            result.NextBillingDate(),
			PaymentMethod:      MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
			CcbillSubscription: ccbillSub,
			UpdatedAt:          result.UpdatedAt(),
			BillingError:       billingError,
			CancellationReason: cancellationReason,
		}
	}

	if result.Status() == billing.Expired {
		return &AccountExpiredClubSupporterSubscription{
			ID:        relay.NewID(AccountExpiredClubSupporterSubscription{}, result.AccountId(), result.ClubId(), result.Id()),
			Reference: result.Id(),
			Account: &Account{
				ID: relay.NewID(Account{}, result.AccountId()),
			},
			Club: &Club{
				ID: relay.NewID(Club{}, result.ClubId()),
			},
			BillingAmount:      int(result.BillingAmount()),
			BillingCurrency:    MarshalCurrencyToGraphQL(ctx, result.BillingCurrency()),
			SupporterSince:     result.SupporterSince(),
			CcbillSubscription: ccbillSub,
			UpdatedAt:          result.UpdatedAt(),
			ExpiredAt:          *result.ExpiredAt(),
			BillingError:       billingError,
			CancellationReason: cancellationReason,
		}
	}

	return nil
}

func MarshalExpiredAccountClubSupporterSubscriptionToGraphQLConnection(ctx context.Context, results []*billing.ExpiredAccountClubSupporterSubscription, cursor *paging.Cursor) *ExpiredAccountClubSupporterSubscriptionConnection {
	var subscriptions []*ExpiredAccountClubSupporterSubscriptionEdge

	conn := &ExpiredAccountClubSupporterSubscriptionConnection{
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

	var nodeAt func(int) *billing.ExpiredAccountClubSupporterSubscription

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *billing.ExpiredAccountClubSupporterSubscription {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *billing.ExpiredAccountClubSupporterSubscription {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		subscriptions = append(subscriptions, &ExpiredAccountClubSupporterSubscriptionEdge{
			Node:   MarshalExpiredAccountClubSupporterSubscriptionToGraphQL(ctx, node),
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

	var ccbillSub *CCBillSubscription

	if result.CCBillSubscriptionId() != nil {
		support := result.GetSupport()
		ccbillSub = &CCBillSubscription{
			PaymentMethod:        support.LookupType(),
			CcbillSubscriptionID: support.SubscriptionId(),
			Email:                support.Email(),
			Link:                 graphql.URI(support.GenerateUrl()),
		}
	}

	return &AccountSavedPaymentMethod{
		ID: relay.NewID(AccountSavedPaymentMethod{}, result.AccountId(), result.Id()),
		Account: &Account{
			ID: relay.NewID(Account{}, result.AccountId()),
		},
		PaymentMethod:      MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
		CcbillSubscription: ccbillSub,
		UpdatedAt:          result.UpdatedAt(),
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

func MarshalAccountTransactionToGraphQL(ctx context.Context, result *billing.AccountTransaction) *AccountTransaction {

	var tp AccountTransactionType

	var clubSubscription *AccountActiveClubSupporterSubscription

	if result.Type() == billing.Void {
		tp = AccountTransactionTypeVoid
	}

	if result.Type() == billing.Refund {
		tp = AccountTransactionTypeRefund
	}

	if result.Type() == billing.Payment {
		tp = AccountTransactionTypePayment
	}

	if result.Type() == billing.Chargeback {
		tp = AccountTransactionTypeChargeback
	}

	if result.ClubSupporterSubscriptionId() != nil {
		clubSubscription = &AccountActiveClubSupporterSubscription{
			ID: relay.NewID(AccountActiveClubSupporterSubscription{}, *result.ClubSupporterSubscriptionId()),
		}
	}

	var subscriptionDetails *CCBillTransaction

	if result.CCBillSubscriptionId() != nil {
		subscriptionDetails = &CCBillTransaction{
			CcbillSubscriptionID: *result.CCBillSubscriptionId(),
			CcbillTransactionID:  result.CCBillTransactionId(),
		}
	}

	var transactionEvents []*AccountTransactionEvent

	for _, event := range result.Events() {
		transactionEvents = append(transactionEvents, &AccountTransactionEvent{
			ID:        relay.NewID(AccountTransactionEvent{}, event.Id()),
			Amount:    int(event.Amount()),
			Currency:  MarshalCurrencyToGraphQL(ctx, event.Currency()),
			Reason:    event.Reason(),
			Timestamp: event.Timestamp(),
		})
	}

	date := result.NextBillingDate()

	return &AccountTransaction{
		ID:                        relay.NewID(AccountTransaction{}, result.Id()),
		Reference:                 result.Id(),
		Type:                      tp,
		Events:                    transactionEvents,
		Amount:                    int(result.Amount()),
		Currency:                  MarshalCurrencyToGraphQL(ctx, result.Currency()),
		BilledAtDate:              result.BilledAtDate(),
		NextBillingDate:           &date,
		PaymentMethod:             MarshalPaymentMethodToGraphQL(ctx, result.PaymentMethod()),
		Timestamp:                 result.Timestamp(),
		CcbillTransaction:         subscriptionDetails,
		ClubSupporterSubscription: clubSubscription,
	}
}

func MarshalAccountTransactionToGraphQLConnection(ctx context.Context, results []*billing.AccountTransaction, cursor *paging.Cursor) *AccountTransactionConnection {
	var transactions []*AccountTransactionEdge

	conn := &AccountTransactionConnection{
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

	var nodeAt func(int) *billing.AccountTransaction

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *billing.AccountTransaction {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *billing.AccountTransaction {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		transactions = append(transactions, &AccountTransactionEdge{
			Node:   MarshalAccountTransactionToGraphQL(ctx, node),
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

func MarshalCCBillDeclineCodeToGraphQL(ctx context.Context, code string) CCBillDeclineError {
	var declineError CCBillDeclineError

	switch code {
	case "11":
		declineError = CCBillDeclineErrorTransactionDeclined
	case "24":
		declineError = CCBillDeclineErrorTransactionDeniedOrRefusedByBank
	case "29":
		declineError = CCBillDeclineErrorCardExpired
	case "31":
		declineError = CCBillDeclineErrorInsufficientFunds
	case "38":
		declineError = CCBillDeclineErrorTransactionDeniedOrRefusedByBank
	case "39":
		declineError = CCBillDeclineErrorRateLimitError
	case "45":
		declineError = CCBillDeclineErrorTransactionApprovalRequired
	default:
		declineError = CCBillDeclineErrorGeneralSystemError
	}

	return declineError
}
