package metrics

import (
	"math"
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

	totalTransactionsCount uint64
	chargebacksCount       uint64
	refundsCount           uint64

	totalRefundsAmount      uint64
	totalChargebacksAmount  uint64
	totalTransactionsAmount uint64

	currency money.Currency
}

func UnmarshalClubTransactionMetricsFromDatabase(clubId string, createdAt time.Time, currency string,
	totalTransactionsCount, chargebacksCount, refundsCount,
	totalRefundsAmount, totalChargebacksAmount, totalTransactionsAmount uint64,
) *ClubTransactionMetrics {
	cr, _ := money.CurrencyFromString(currency)
	return &ClubTransactionMetrics{
		clubId:                  clubId,
		month:                   int(createdAt.Month()),
		year:                    createdAt.Year(),
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
	return toFixed(float64(m.chargebacksCount)/float64(m.totalTransactionsCount), 4)
}

func (m *ClubTransactionMetrics) ChargebacksAmountRatio() float64 {
	return toFixed(float64(m.totalChargebacksAmount)/float64(m.totalTransactionsAmount), 4)
}

func (m *ClubTransactionMetrics) RefundsAmountRatio() float64 {
	return toFixed(float64(m.totalRefundsAmount)/float64(m.totalTransactionsAmount), 4)
}

func (m *ClubTransactionMetrics) RefundsCountRatio() float64 {
	return toFixed(float64(m.refundsCount)/float64(m.totalTransactionsCount), 4)
}

func (m *ClubTransactionMetrics) TotalTransactions() uint64 {
	return m.totalTransactionsCount
}

func (m *ClubTransactionMetrics) ChargebacksCount() uint64 {
	return m.chargebacksCount
}

func (m *ClubTransactionMetrics) RefundsCount() uint64 {
	return m.refundsCount
}

func (m *ClubTransactionMetrics) TotalTransactionsAmount() uint64 {
	return m.totalTransactionsAmount
}

func (m *ClubTransactionMetrics) RefundsAmount() uint64 {
	return m.totalRefundsAmount
}

func (m *ClubTransactionMetrics) ChargebacksAmount() uint64 {
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

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func toFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num*output)) / output
}
