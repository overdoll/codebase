package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
)

type GetReadyPaymentsForClubAndAppendInput struct {
	ClubId   string
	PayoutId string
}

type GetReadyPaymentsForClubAndAppendPayload struct {
	TotalAmount           uint64
	Currency              money.Currency
	AccountPayoutMethodId string
}

func (h *Activities) GetReadyPaymentsForClubAndAppend(ctx context.Context, input GetReadyPaymentsForClubAndAppendInput) (*GetReadyPaymentsForClubAndAppendPayload, error) {

	// first, grab the account payout method
	clb, err := h.stella.GetClubById(ctx, input.ClubId)

	if err != nil {
		return nil, err
	}

	acc, err := h.eva.GetAccount(ctx, clb.OwnerAccountId())

	if err != nil {
		return nil, err
	}

	method, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, clb.OwnerAccountId())

	if err != nil {

		// if no payout method is available, exit out since we can't complete a payout
		if err == payout.ErrAccountPayoutMethodNotFound {
			return nil, nil
		}

		return nil, err

	}

	type paymentGroup struct {
		paymentIds  []string
		totalAmount uint64
	}

	currencyMap := make(map[money.Currency]*paymentGroup)

	if err := h.pr.ScanClubReadyPaymentsList(ctx,
		input.ClubId,
		func(paymentId string, amount uint64, isDeduction bool, currency money.Currency) {

			if _, ok := currencyMap[currency]; !ok {
				currencyMap[currency] = &paymentGroup{
					paymentIds:  nil,
					totalAmount: 0,
				}
			}

			currencyMap[currency].paymentIds = append(currencyMap[currency].paymentIds, paymentId)

			if !isDeduction {
				currencyMap[currency].totalAmount += amount
			} else {
				currencyMap[currency].totalAmount -= amount
			}

		},
	); err != nil {
		return nil, err
	}

	result := &GetReadyPaymentsForClubAndAppendPayload{}

	for currency, val := range currencyMap {

		// payout method was validated correctly
		if method.Validate(acc, val.totalAmount, currency) {

			result.AccountPayoutMethodId = method.AccountId()
			result.Currency = currency
			result.TotalAmount = val.totalAmount

			if err := h.pr.AddClubPaymentsToPayout(ctx, input.PayoutId, val.paymentIds); err != nil {
				return nil, err
			}

			break
		}
	}

	return result, nil
}
