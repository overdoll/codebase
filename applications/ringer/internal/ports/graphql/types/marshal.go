package types

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"time"
)

func MarshalClubPaymentsToGraphQLConnection(ctx context.Context, results []*payment.ClubPayment, cursor *paging.Cursor) *ClubPaymentConnection {

	var payouts []*ClubPaymentEdge

	conn := &ClubPaymentConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: payouts,
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

	var nodeAt func(int) *payment.ClubPayment

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *payment.ClubPayment {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *payment.ClubPayment {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		payouts = append(payouts, &ClubPaymentEdge{
			Node:   MarshalClubPaymentToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = payouts

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalClubPaymentToGraphQL(ctx context.Context, result *payment.ClubPayment) *ClubPayment {

	var src ClubPaymentSource
	var sts ClubPaymentStatus

	if result.IsClubSupporterSubscriptionSource() {
		src = ClubPaymentSourceClubSupporterSubscription
	}

	if result.IsPending() {
		sts = ClubPaymentStatusPending
	}

	if result.IsReady() {
		sts = ClubPaymentStatusReady
	}

	if result.IsComplete() {
		sts = ClubPaymentStatusComplete
	}

	return &ClubPayment{
		ID:                 relay.NewID(ClubPayment{}, result.Id()),
		Reference:          result.Id(),
		Source:             src,
		Status:             sts,
		Currency:           MarshalCurrencyToGraphQL(ctx, result.Currency()),
		BaseAmount:         int(result.BaseAmount()),
		PlatformFeeAmount:  int(result.PlatformFeeAmount()),
		FinalAmount:        int(result.FinalAmount()),
		IsDeduction:        result.IsDeduction(),
		SettlementDate:     result.SettlementDate(),
		AccountTransaction: &AccountTransaction{ID: relay.NewID(AccountTransaction{}, result.AccountTransactionId())},
		DestinationClub:    &Club{ID: relay.NewID(Club{}, result.DestinationClubId())},
		SourceAccount:      &Account{ID: relay.NewID(Account{}, result.SourceAccountId())},
	}
}

func MarshalClubPayoutsToGraphQLConnection(ctx context.Context, results []*payout.ClubPayout, cursor *paging.Cursor) *ClubPayoutConnection {

	var payouts []*ClubPayoutEdge

	conn := &ClubPayoutConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: payouts,
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

	var nodeAt func(int) *payout.ClubPayout

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *payout.ClubPayout {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *payout.ClubPayout {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		payouts = append(payouts, &ClubPayoutEdge{
			Node:   MarshalClubPayoutToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = payouts

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalClubPayoutToGraphQL(ctx context.Context, result *payout.ClubPayout) *ClubPayout {

	var stat ClubPayoutStatus

	if result.IsFailed() {
		stat = ClubPayoutStatusFailed
	}

	if result.IsCancelled() {
		stat = ClubPayoutStatusCancelled
	}

	if result.IsQueued() {
		stat = ClubPayoutStatusQueued
	}

	if result.IsProcessing() {
		stat = ClubPayoutStatusProcessing
	}

	if result.IsDeposited() {
		stat = ClubPayoutStatusDeposited
	}

	var clubEvents []*ClubPayoutEvent

	for _, e := range result.Events() {
		clubEvents = append(clubEvents, &ClubPayoutEvent{
			ID:        relay.NewID(ClubPayoutEvent{}, e.Id()),
			Error:     e.Error(),
			Timestamp: e.Timestamp(),
		})
	}

	return &ClubPayout{
		ID:        relay.NewID(ClubPayout{}, result.Id()),
		Reference: result.Id(),
		Status:    stat,
		Currency:  MarshalCurrencyToGraphQL(ctx, result.Currency()),
		Amount:    int(result.Amount()),
		Events:    clubEvents,
		Club: &Club{
			ID: relay.NewID(Club{}, result.ClubId()),
		},
		PayoutAccount: &Account{
			ID: relay.NewID(Account{}, result.PayoutAccountId()),
		},
		DepositDate: time.Time{},
		CreatedAt:   time.Time{},
	}
}

func MarshalCurrencyToGraphQL(ctx context.Context, result money.Currency) Currency {

	var currency Currency

	switch result {
	case money.USD:
		currency = CurrencyUsd
	case money.CAD:
		currency = CurrencyCad
	case money.AUD:
		currency = CurrencyAud
	case money.JPY:
		currency = CurrencyJpy
	case money.GBP:
		currency = CurrencyGbp
	case money.EUR:
		currency = CurrencyEur
	}

	return currency
}

func MarshalAccountDetailsToGraphQL(ctx context.Context, result *details.AccountDetails) *AccountDetails {
	return &AccountDetails{
		ID:        relay.NewID(AccountDetails{}, result.AccountId()),
		FirstName: result.FirstName(),
		LastName:  result.LastName(),
		Country:   MarshalCountryToGraphQL(ctx, payout.GetCountryWithMethodFromCountryCode(result.Country())),
	}
}

func MarshalCountryToGraphQL(ctx context.Context, country *payout.CountryWithMethod) *Country {

	var methods []PayoutMethod

	for _, m := range country.Methods() {
		if m == payout.Paxum {
			methods = append(methods, PayoutMethodPaxum)
		}
	}

	return &Country{
		ID:            relay.NewID(Country{}, country.Country().Alpha3()),
		Emoji:         country.Country().Emoji3(),
		Name:          country.Country().String(),
		Alpha3:        country.Country().Alpha3(),
		PayoutMethods: methods,
	}
}

func MarshalDepositRequestToGraphQL(ctx context.Context, result *payout.DepositRequest) *DepositRequest {

	var method PayoutMethod

	if result.IsPaxum() {
		method = PayoutMethodPaxum
	}

	return &DepositRequest{
		ID:                 relay.NewID(DepositRequest{}, result.Id()),
		Reference:          result.Id(),
		PayoutMethod:       method,
		Currency:           MarshalCurrencyToGraphQL(ctx, result.Currency()),
		BaseAmount:         int(result.BaseAmount()),
		EstimatedFeeAmount: int(result.EstimatedFeeAmount()),
		TotalAmount:        int(result.TotalAmount()),
		LastDateForDeposit: result.LastDateForDeposit(),
		CreatedAt:          result.Timestamp(),
	}
}

func MarshalDepositRequestToGraphQLConnection(ctx context.Context, results []*payout.DepositRequest, cursor *paging.Cursor) *DepositRequestConnection {

	var payouts []*DepositRequestEdge

	conn := &DepositRequestConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: payouts,
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

	var nodeAt func(int) *payout.DepositRequest

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *payout.DepositRequest {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *payout.DepositRequest {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		payouts = append(payouts, &DepositRequestEdge{
			Node:   MarshalDepositRequestToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = payouts

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAccountPayoutMethodToGraphQL(ctx context.Context, result *payout.AccountPayoutMethod) AccountPayoutMethod {

	var accountMethod AccountPayoutMethod

	if result.IsPaxum() {
		accountMethod = &AccountPaxumPayoutMethod{
			ID:    relay.NewID(AccountPaxumPayoutMethod{}, result.AccountId()),
			Email: *result.PaxumEmail(),
		}
	}

	return accountMethod
}

func MarshalClubBalanceToGraphQL(ctx context.Context, result *balance.ClubBalance) *Balance {
	return &Balance{
		ID:        relay.NewID(Balance{}, result.ClubId()),
		Amount:    int(result.Amount()),
		Currency:  MarshalCurrencyToGraphQL(ctx, result.Currency()),
		UpdatedAt: result.UpdatedAt(),
	}
}

func MarshalClubPlatformFeeToGraphQL(ctx context.Context, result *payment.ClubPlatformFee) *ClubPlatformFee {
	return &ClubPlatformFee{
		ID:      relay.NewID(ClubPlatformFee{}, result.ClubId()),
		Percent: int(result.Percent()),
	}
}
