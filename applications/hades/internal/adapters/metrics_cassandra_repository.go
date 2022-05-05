package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/metrics"
	bucket "overdoll/libraries/bucket"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var clubTransactionsColumns = []string{
	"club_id",
	"bucket",
	"timestamp",
	"id",
	"amount",
	"currency",
}

var clubAllTransactionsTable = table.New(table.Metadata{
	Name:    "club_all_transactions",
	Columns: clubTransactionsColumns,
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{"timestamp", "id"},
})

var clubRefundTransactionsTable = table.New(table.Metadata{
	Name:    "club_refund_transactions",
	Columns: clubTransactionsColumns,
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{"timestamp", "id"},
})

var clubChargebackTransactionsTable = table.New(table.Metadata{
	Name:    "club_chargeback_transactions",
	Columns: clubTransactionsColumns,
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{"timestamp", "id"},
})

type clubTransactionMetric struct {
	ClubId    string     `db:"club_id"`
	Bucket    int        `db:"bucket"`
	Timestamp gocql.UUID `db:"timestamp"`
	Id        string     `db:"id"`
	Amount    int64      `db:"amount"`
	Currency  string     `db:"currency"`
}

var clubTransactionMetricsTable = table.New(table.Metadata{
	Name: "club_transaction_metrics",
	Columns: []string{
		"club_id",
		"timestamp",
		"bucket",
		"currency",

		"total_transactions_count",
		"total_transactions_amount",
		"total_transactions_last_update_id",

		"chargeback_transactions_count",
		"chargeback_transactions_amount",
		"chargeback_transactions_last_update_id",

		"refund_transactions_count",
		"refund_transactions_amount",
		"refund_transactions_last_update_id",
	},
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{},
})

type clubTransactionMetrics struct {
	ClubId    string    `db:"club_id"`
	Bucket    int       `db:"bucket"`
	Timestamp time.Time `db:"timestamp"`
	Currency  string    `db:"currency"`

	TotalTransactionsCount        int64      `db:"total_transactions_count"`
	TotalTransactionsAmount       int64      `db:"total_transactions_amount"`
	TotalTransactionsLastUpdateId gocql.UUID `db:"total_transactions_last_update_id"`

	ChargebackTransactionsCount        int64      `db:"chargeback_transactions_count"`
	ChargebackTransactionsAmount       int64      `db:"chargeback_transactions_amount"`
	ChargebackTransactionsLastUpdateId gocql.UUID `db:"chargeback_transactions_last_update_id"`

	RefundTransactionsCount        int64      `db:"refund_transactions_count"`
	RefundTransactionsAmount       int64      `db:"refund_transactions_amount"`
	RefundTransactionsLastUpdateId gocql.UUID `db:"refund_transactions_last_update_id"`
}

var clubChargebackSuspensionsTable = table.New(table.Metadata{
	Name: "club_chargeback_suspensions",
	Columns: []string{
		"club_id",
		"bucket",
	},
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{},
})

type clubChargebackSuspensions struct {
	ClubId string `db:"club_id"`
	Bucket int    `db:"bucket"`
}

type MetricsCassandraRepository struct {
	session gocqlx.Session
}

func NewMetricsCassandraRepository(session gocqlx.Session) MetricsCassandraRepository {
	return MetricsCassandraRepository{session: session}
}

func (r MetricsCassandraRepository) CreateClubTransactionMetric(ctx context.Context, metric *metrics.ClubTransactionMetric) error {

	bucket := bucket.MakeMonthlyBucketFromTimestamp(metric.Timestamp().Time())

	table := clubAllTransactionsTable

	if metric.IsRefund() {
		table = clubRefundTransactionsTable
	}

	if metric.IsChargeback() {
		table = clubChargebackTransactionsTable
	}

	newInsertTimestamp := metric.Timestamp()

	// first, create transaction record
	if err := r.session.Query(table.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubTransactionMetric{
			ClubId:    metric.ClubId(),
			Bucket:    bucket,
			Timestamp: metric.Timestamp(),
			Id:        metric.Id(),
			Amount:    metric.Amount(),
			Currency:  metric.Currency().String(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create club transaction metric: %v", err)
	}

	// try to get the metrics, to update it
	met, err := r.getClubTransactionMetrics(ctx, metric.ClubId(), metric.Timestamp().Time())

	if err != nil && err != gocql.ErrNotFound {
		return err
	}

	// did not find metrics - create one instead - do a unique insert
	if met == nil {

		target := clubTransactionMetrics{
			ClubId:                             metric.ClubId(),
			Bucket:                             bucket,
			Timestamp:                          metric.Timestamp().Time(),
			Currency:                           metric.Currency().String(),
			TotalTransactionsCount:             0,
			TotalTransactionsAmount:            0,
			TotalTransactionsLastUpdateId:      gocql.TimeUUID(),
			ChargebackTransactionsCount:        0,
			ChargebackTransactionsAmount:       0,
			ChargebackTransactionsLastUpdateId: gocql.TimeUUID(),
			RefundTransactionsCount:            0,
			RefundTransactionsAmount:           0,
			RefundTransactionsLastUpdateId:     gocql.TimeUUID(),
		}

		applied, err := r.session.Query(clubTransactionMetricsTable.Insert()).
			Consistency(gocql.LocalQuorum).
			BindStruct(target).
			ExecCAS()

		if err != nil {
			return fmt.Errorf("failed to create club transaction metric: %v", err)
		}

		if !applied {
			return fmt.Errorf("failed to create club transaction metric")
		}

		met = &target
	}

	type metricsCount struct {
		MaxTimestamp gocql.UUID `db:"system.max(timestamp)"`
		Count        int64      `db:"count"`
		Amount       int64      `db:"system.sum(amount)"`
	}

	var res metricsCount

	// get the total count + amounts for that partition
	if err := table.
		SelectBuilder().
		Where(qb.Gt("timestamp")).
		CountAll().
		Max("timestamp").
		Query(r.session).
		BindStruct(clubTransactionMetric{
			ClubId:    metric.ClubId(),
			Bucket:    bucket,
			Timestamp: newInsertTimestamp,
		}).
		Get(&res); err != nil {
		return fmt.Errorf("failed to count: %v", err)
	}

	metricsBuilder := clubTransactionMetricsTable.
		UpdateBuilder()

	metricsStruct := met

	// update metrics for each item with LWT transactions
	if !metric.IsRefund() && !metric.IsChargeback() {
		metricsBuilder.Set("total_transactions_count", "total_transactions_amount", "total_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("total_transactions_last_update_id", met.TotalTransactionsLastUpdateId.String()))
		metricsStruct.TotalTransactionsAmount += res.Amount
		metricsStruct.TotalTransactionsCount += res.Count
		metricsStruct.TotalTransactionsLastUpdateId = res.MaxTimestamp
	}

	if metric.IsRefund() {
		metricsBuilder.Set("refund_transactions_count", "refund_transactions_amount", "refund_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("refund_transactions_last_update_id", met.RefundTransactionsLastUpdateId.String()))
		metricsStruct.RefundTransactionsAmount += res.Amount
		metricsStruct.RefundTransactionsCount += res.Count
		metricsStruct.RefundTransactionsLastUpdateId = res.MaxTimestamp
	}

	if metric.IsChargeback() {
		metricsBuilder.Set("chargeback_transactions_count", "chargeback_transactions_amount", "chargeback_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("chargeback_transactions_last_update_id", met.ChargebackTransactionsLastUpdateId.String()))
		metricsStruct.ChargebackTransactionsAmount += res.Amount
		metricsStruct.ChargebackTransactionsCount += res.Count
		metricsStruct.ChargebackTransactionsLastUpdateId = res.MaxTimestamp
	}

	// apply the count
	applied, err := metricsBuilder.
		Query(r.session).
		BindStruct(metricsStruct).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to update count: %v", err)
	}

	if !applied {
		return fmt.Errorf("failed to update count")
	}

	return nil
}

func (r MetricsCassandraRepository) getClubTransactionMetrics(ctx context.Context, clubId string, timestamp time.Time) (*clubTransactionMetrics, error) {

	var met clubTransactionMetrics

	if err := r.session.Query(clubTransactionMetricsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubTransactionMetrics{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		Get(&met); err != nil {

		if err == gocql.ErrNotFound {
			return nil, gocql.ErrNotFound
		}

		return nil, fmt.Errorf("failed to get club transaction metric: %v", err)
	}

	return &met, nil
}

func (r MetricsCassandraRepository) GetClubTransactionMetrics(ctx context.Context, clubId string, timestamp time.Time) (*metrics.ClubTransactionMetrics, error) {

	met, err := r.getClubTransactionMetrics(ctx, clubId, timestamp)

	if err != nil {
		return nil, err
	}

	return metrics.UnmarshalClubTransactionMetricsFromDatabase(
		met.ClubId,
		met.Timestamp,
		met.Currency,
		met.TotalTransactionsCount,
		met.ChargebackTransactionsCount,
		met.RefundTransactionsCount,
		met.RefundTransactionsAmount,
		met.ChargebackTransactionsAmount,
		met.TotalTransactionsAmount,
	), nil
}

func (r MetricsCassandraRepository) SearchClubTransactionMetrics(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*metrics.ClubTransactionMetrics, error) {

	var results []*metrics.ClubTransactionMetrics

	if err := metrics.CanViewClubTransactionMetrics(requester, clubId); err != nil {
		return nil, err
	}

	startingBucket := bucket.MakeMonthlyBucketFromTimestamp(time.Now())
	endingBucket := 0

	// iterate through all buckets starting from x bucket until we have enough values
	for bucketId := startingBucket; bucketId >= endingBucket; bucketId-- {

		var builder *qb.SelectBuilder

		info := map[string]interface{}{}

		builder = qb.Select(clubTransactionMetricsTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("club_id"))

		info["bucket"] = bucketId
		info["club_id"] = clubId

		var met clubTransactionMetrics

		if err := builder.
			Query(r.session).
			BindMap(info).
			Get(&met); err != nil {
			return nil, fmt.Errorf("failed to get club transaction metrics: %v", err)
		}

		res := metrics.UnmarshalClubTransactionMetricsFromDatabase(
			met.ClubId,
			met.Timestamp,
			met.Currency,
			met.TotalTransactionsCount,
			met.ChargebackTransactionsCount,
			met.RefundTransactionsCount,
			met.RefundTransactionsAmount,
			met.ChargebackTransactionsAmount,
			met.TotalTransactionsAmount,
		)

		res.Node = paging.NewNode(met.Timestamp)
		results = append(results, res)

		if len(results) >= cursor.GetLimit() {
			break
		}
	}

	return results, nil
}

func (r MetricsCassandraRepository) IsClubAlreadySuspended(ctx context.Context, clubId string, timestamp time.Time) (bool, error) {

	var suspensionChargeback clubChargebackSuspensions

	// first, create transaction record
	if err := r.session.Query(clubChargebackSuspensionsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubChargebackSuspensions{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		Get(&suspensionChargeback); err != nil {

		if err == gocql.ErrNotFound {
			return false, nil
		}

		return false, fmt.Errorf("failed to get club is already suspended: %v", err)
	}

	return true, nil
}

func (r MetricsCassandraRepository) AddClubAlreadySuspended(ctx context.Context, clubId string, timestamp time.Time) error {

	if err := clubChargebackSuspensionsTable.InsertBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubChargebackSuspensions{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to add club already suspended: %v", err)
	}

	return nil
}
