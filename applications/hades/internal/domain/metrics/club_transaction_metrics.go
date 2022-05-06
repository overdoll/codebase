package metrics

import (
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	chargebacksThreshold = 0.005
)

type ClubTransactionMetrics struct {
	*paging.Node

	clubId string

	month int
	year  int

	totalTransactionsCount int64
	chargebacksCount       int64
	refundsCount           int64

	totalRefundsAmount      int64
	totalChargebacksAmount  int64
	totalTransactionsAmount int64

	currency money.Currency
}

func UnmarshalClubTransactionMetricsFromDatabase(clubId string, timestamp time.Time, currency string,
	totalTransactionsCount, chargebacksCount, refundsCount,
	totalRefundsAmount, totalChargebacksAmount, totalTransactionsAmount int64,
) *ClubTransactionMetrics {
	cr, _ := money.CurrencyFromString(currency)
	return &ClubTransactionMetrics{
		clubId:                  clubId,
		month:                   int(timestamp.Month()),
		year:                    timestamp.Year(),
		totalTransactionsCount:  totalTransactionsCount,
		chargebacksCount:        chargebacksCount,
		refundsCount:            refundsCount,
		totalRefundsAmount:      totalRefundsAmount,
		totalChargebacksAmount:  totalChargebacksAmount,
		totalTransactionsAmount: totalTransactionsAmount,
		currency:                cr,
	}
}

func (m *ClubTransactionMetrics) ClubId() string {
	return m.clubId
}

func (m *ClubTransactionMetrics) Month() int {
	return m.month
}

func (m *ClubTransactionMetrics) Year() int {
	return m.year
}

func (m *ClubTransactionMetrics) Currency() money.Currency {
	return m.currency
}

func (m *ClubTransactionMetrics) ChargebacksCountRatio() float64 {

	if m.totalTransactionsCount == 0 {
		return 0
	}

	return float64(m.totalTransactionsCount / m.totalTransactionsCount)
}

func (m *ClubTransactionMetrics) ChargebacksAmountRatio() float64 {

	if m.totalChargebacksAmount == 0 {
		return 0
	}

	return float64(m.totalTransactionsAmount / m.totalChargebacksAmount)
}

func (m *ClubTransactionMetrics) RefundsAmountRatio() float64 {

	if m.totalRefundsAmount == 0 {
		return 0
	}

	return float64(m.totalTransactionsAmount / m.totalRefundsAmount)
}

func (m *ClubTransactionMetrics) RefundsCountRatio() float64 {

	if m.refundsCount == 0 {
		return 0
	}

	return float64(m.totalTransactionsCount / m.refundsCount)
}

func (m *ClubTransactionMetrics) TotalTransactions() int64 {
	return m.totalTransactionsCount
}

func (m *ClubTransactionMetrics) ChargebacksCount() int64 {
	return m.chargebacksCount
}

func (m *ClubTransactionMetrics) RefundsCount() int64 {
	return m.refundsCount
}

func (m *ClubTransactionMetrics) TotalTransactionsAmount() int64 {
	return m.totalTransactionsAmount
}

func (m *ClubTransactionMetrics) RefundsAmount() int64 {
	return m.totalRefundsAmount
}

func (m *ClubTransactionMetrics) ChargebacksAmount() int64 {
	return m.totalChargebacksAmount
}

func (m *ClubTransactionMetrics) IsOverChargebacksThreshold() bool {
	return m.ChargebacksCountRatio() > chargebacksThreshold
}

func (m *ClubTransactionMetrics) ChargebacksThreshold() float64 {
	return chargebacksThreshold
}

func CanViewClubTransactionMetrics(requester *principal.Principal, clubId string) error {

	if !requester.IsStaff() {

		if err := requester.CheckClubOwner(clubId); err != nil {
			return err
		}

		return nil
	}

	return nil
}
