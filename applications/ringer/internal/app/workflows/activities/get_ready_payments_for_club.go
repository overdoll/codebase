package activities

import (
	"context"
	"overdoll/libraries/money"
)

type GetReadyPaymentsForClubInput struct {
	ClubId string
}

type GetReadyPaymentsForClubCurrencyGroupPayload struct {
	PaymentIds  []string
	TotalAmount int64
	Currency    money.Currency
}

type GetReadyPaymentsForClubPayload struct {
	PaymentsGroup []*GetReadyPaymentsForClubCurrencyGroupPayload
}

func (h *Activities) GetReadyPaymentsForClub(ctx context.Context, input GetReadyPaymentsForClubInput) (*GetReadyPaymentsForClubPayload, error) {

	type paymentGroup struct {
		paymentIds  []string
		totalAmount int64
	}

	currencyMap := make(map[money.Currency]*paymentGroup)

	if err := h.pr.ScanClubReadyPaymentsList(ctx,
		input.ClubId,
		func(paymentId string, amount int64, currency money.Currency) {

			if _, ok := currencyMap[currency]; !ok {
				currencyMap[currency] = &paymentGroup{
					paymentIds:  nil,
					totalAmount: 0,
				}
			}

			currencyMap[currency].paymentIds = append(currencyMap[currency].paymentIds, paymentId)
			currencyMap[currency].totalAmount += amount
		},
	); err != nil {
		return nil, err
	}

	var readyPayments []*GetReadyPaymentsForClubCurrencyGroupPayload

	for id, val := range currencyMap {
		readyPayments = append(readyPayments, &GetReadyPaymentsForClubCurrencyGroupPayload{
			PaymentIds:  val.paymentIds,
			TotalAmount: val.totalAmount,
			Currency:    id,
		})
	}

	return &GetReadyPaymentsForClubPayload{PaymentsGroup: readyPayments}, nil
}
