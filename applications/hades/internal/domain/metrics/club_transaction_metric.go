package metrics

import (
	"errors"
	"github.com/gocql/gocql"
	"overdoll/libraries/money"
)

type ClubTransactionMetric struct {
	clubId    string
	timestamp gocql.UUID
	id        string
	amount    int64
	currency  money.Currency

	isRefund     bool
	isChargeback bool
}

func NewInitialTransactionMetric(clubId string, timestamp gocql.UUID, id string, amount int64, currency money.Currency) (*ClubTransactionMetric, error) {

	if currency != money.USD {
		return nil, errors.New("only USD currency supported for metrics")
	}

	return &ClubTransactionMetric{
		clubId:       clubId,
		timestamp:    timestamp,
		id:           id,
		amount:       amount,
		currency:     currency,
		isRefund:     false,
		isChargeback: false,
	}, nil
}

func NewRefundTransactionMetric(clubId string, timestamp gocql.UUID, id string, amount int64, currency money.Currency) (*ClubTransactionMetric, error) {

	if currency != money.USD {
		return nil, errors.New("only USD currency supported for metrics")
	}

	return &ClubTransactionMetric{
		clubId:       clubId,
		timestamp:    timestamp,
		id:           id,
		amount:       amount,
		currency:     currency,
		isRefund:     true,
		isChargeback: false,
	}, nil
}

func NewChargebackTransactionMetric(clubId string, timestamp gocql.UUID, id string, amount int64, currency money.Currency) (*ClubTransactionMetric, error) {

	if currency != money.USD {
		return nil, errors.New("only USD currency supported for metrics")
	}

	return &ClubTransactionMetric{
		clubId:       clubId,
		timestamp:    timestamp,
		id:           id,
		amount:       amount,
		currency:     currency,
		isRefund:     false,
		isChargeback: true,
	}, nil
}
