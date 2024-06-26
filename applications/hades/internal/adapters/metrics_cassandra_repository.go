package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/metrics"
	bucket "overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
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
	Amount    uint64     `db:"amount"`
	Currency  string     `db:"currency"`
}

var clubTransactionMetricsTable = table.New(table.Metadata{
	Name: "club_transaction_metrics",
	Columns: []string{
		"club_id",
		"created_at",
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

var clubTransactionMetricsBucketsTable = table.New(table.Metadata{
	Name: "club_transaction_metrics_buckets",
	Columns: []string{
		"club_id",
		"bucket",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"bucket"},
})

type clubTransactionMetricsBuckets struct {
	ClubId string `db:"club_id"`
	Bucket int    `db:"bucket"`
}

type clubTransactionMetrics struct {
	ClubId    string    `db:"club_id"`
	Bucket    int       `db:"bucket"`
	CreatedAt time.Time `db:"created_at"`
	Currency  string    `db:"currency"`

	TotalTransactionsCount        uint64     `db:"total_transactions_count"`
	TotalTransactionsAmount       uint64     `db:"total_transactions_amount"`
	TotalTransactionsLastUpdateId gocql.UUID `db:"total_transactions_last_update_id"`

	ChargebackTransactionsCount        uint64     `db:"chargeback_transactions_count"`
	ChargebackTransactionsAmount       uint64     `db:"chargeback_transactions_amount"`
	ChargebackTransactionsLastUpdateId gocql.UUID `db:"chargeback_transactions_last_update_id"`

	RefundTransactionsCount        uint64     `db:"refund_transactions_count"`
	RefundTransactionsAmount       uint64     `db:"refund_transactions_amount"`
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
		WithContext(ctx).
		Idempotent(true).
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
		return errors.Wrap(support.NewGocqlError(err), "failed to create club transaction metrics")
	}

	// try to get the metrics, to update it
	met, err := r.getClubTransactionMetrics(ctx, metric.ClubId(), metric.Timestamp().Time())

	if err != nil && err != gocql.ErrNotFound {
		return err
	}

	// did not find metrics - create one instead - do a unique insert
	if met == nil {

		if err := r.session.Query(clubTransactionMetricsBucketsTable.Insert()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(clubTransactionMetricsBuckets{ClubId: metric.ClubId(), Bucket: bucket}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to insert club transaction metric bucket")
		}

		target := clubTransactionMetrics{
			ClubId:                             metric.ClubId(),
			Bucket:                             bucket,
			CreatedAt:                          metric.Timestamp().Time(),
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

		applied, err := r.session.Query(clubTransactionMetricsTable.InsertBuilder().Unique().ToCql()).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(target).
			ExecCASRelease()

		if err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to insert club transaction metric")
		}

		if !applied {
			return errors.Wrap(support.NewGocqlTransactionError(), "failed to insert club transaction metric")
		}

		met = &target
	}

	type metricsCount struct {
		MaxTimestamp *gocql.UUID `db:"system.max(timestamp)"`
		Count        uint64      `db:"count"`
		Amount       uint64      `db:"system.sum(amount)"`
	}

	var res metricsCount

	// get the total count + amounts for that partition
	if err := table.
		SelectBuilder().
		Where(qb.Gt("timestamp")).
		CountAll().
		Max("timestamp").
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(clubTransactionMetric{
			ClubId:    metric.ClubId(),
			Bucket:    bucket,
			Timestamp: newInsertTimestamp,
		}).
		GetRelease(&res); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to do metrics count")
	}

	metricsBuilder := clubTransactionMetricsTable.
		UpdateBuilder()

	metricsStruct := met

	// if max timestamp is nil, this must be our first record
	if res.MaxTimestamp == nil {
		res.MaxTimestamp = &newInsertTimestamp
		res.Amount = metric.Amount()
		res.Count = 1
	}

	// update metrics for each item with LWT transactions
	if !metric.IsRefund() && !metric.IsChargeback() {
		metricsBuilder.Set("total_transactions_count", "total_transactions_amount", "total_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("total_transactions_last_update_id", met.TotalTransactionsLastUpdateId.String()))
		metricsStruct.TotalTransactionsAmount += res.Amount
		metricsStruct.TotalTransactionsCount += res.Count
		metricsStruct.TotalTransactionsLastUpdateId = *res.MaxTimestamp
	}

	if metric.IsRefund() {
		metricsBuilder.Set("refund_transactions_count", "refund_transactions_amount", "refund_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("refund_transactions_last_update_id", met.RefundTransactionsLastUpdateId.String()))
		metricsStruct.RefundTransactionsAmount += res.Amount
		metricsStruct.RefundTransactionsCount += res.Count
		metricsStruct.RefundTransactionsLastUpdateId = *res.MaxTimestamp
	}

	if metric.IsChargeback() {
		metricsBuilder.Set("chargeback_transactions_count", "chargeback_transactions_amount", "chargeback_transactions_last_update_id")
		metricsBuilder.If(qb.EqLit("chargeback_transactions_last_update_id", met.ChargebackTransactionsLastUpdateId.String()))
		metricsStruct.ChargebackTransactionsAmount += res.Amount
		metricsStruct.ChargebackTransactionsCount += res.Count
		metricsStruct.ChargebackTransactionsLastUpdateId = *res.MaxTimestamp
	}

	// apply the count
	applied, err := metricsBuilder.
		Query(r.session).
		WithContext(ctx).
		BindStruct(metricsStruct).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update metrics count")
	}

	if !applied {
		return errors.Wrap(support.NewGocqlTransactionError(), "failed to update metrics count")
	}

	return nil
}

func (r MetricsCassandraRepository) getClubTransactionMetrics(ctx context.Context, clubId string, timestamp time.Time) (*clubTransactionMetrics, error) {

	var met clubTransactionMetrics

	if err := r.session.Query(clubTransactionMetricsTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Idempotent(true).
		BindStruct(clubTransactionMetrics{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		GetRelease(&met); err != nil {

		if err == gocql.ErrNotFound {
			return nil, gocql.ErrNotFound
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club transaction metric")
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
		met.CreatedAt,
		met.Currency,
		met.TotalTransactionsCount,
		met.ChargebackTransactionsCount,
		met.RefundTransactionsCount,
		met.RefundTransactionsAmount,
		met.ChargebackTransactionsAmount,
		met.TotalTransactionsAmount,
	), nil
}
func (r MetricsCassandraRepository) getClubTransactionMetricsBuckets(ctx context.Context, clubId string) ([]int, error) {

	var buckets []clubTransactionMetricsBuckets

	if err := r.session.Query(clubTransactionMetricsBucketsTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubTransactionMetricsBuckets{
			ClubId: clubId,
		}).
		SelectRelease(&buckets); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club transaction metric buckets")
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r MetricsCassandraRepository) SearchClubTransactionMetrics(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*metrics.ClubTransactionMetrics, error) {

	var results []*metrics.ClubTransactionMetrics

	if err := metrics.CanViewClubTransactionMetrics(requester, clubId); err != nil {
		return nil, err
	}

	buckets, err := r.getClubTransactionMetricsBuckets(ctx, clubId)

	if err != nil {
		return nil, err
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		var met clubTransactionMetrics

		if err := qb.Select(clubTransactionMetricsTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("club_id")).
			Query(r.session).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(clubTransactionMetrics{
				Bucket: bucketId,
				ClubId: clubId,
			}).
			GetRelease(&met); err != nil {

			// if we didn't find any transaction metric, skip this iteration
			if err == gocql.ErrNotFound {
				continue
			}

			return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club transaction metrics")
		}

		res := metrics.UnmarshalClubTransactionMetricsFromDatabase(
			met.ClubId,
			met.CreatedAt,
			met.Currency,
			met.TotalTransactionsCount,
			met.ChargebackTransactionsCount,
			met.RefundTransactionsCount,
			met.RefundTransactionsAmount,
			met.ChargebackTransactionsAmount,
			met.TotalTransactionsAmount,
		)

		res.Node = paging.NewNode(met.CreatedAt)
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Idempotent(true).
		BindStruct(clubChargebackSuspensions{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		GetRelease(&suspensionChargeback); err != nil {

		if err == gocql.ErrNotFound {
			return false, nil
		}

		return false, errors.Wrap(support.NewGocqlError(err), "failed to get club is already suspended")
	}

	return true, nil
}

func (r MetricsCassandraRepository) AddClubAlreadySuspended(ctx context.Context, clubId string, timestamp time.Time) error {

	if err := clubChargebackSuspensionsTable.InsertBuilder().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubChargebackSuspensions{
			ClubId: clubId,
			Bucket: bucket.MakeMonthlyBucketFromTimestamp(timestamp),
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to add club already suspended")
	}

	return nil
}
