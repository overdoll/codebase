package adapters

import (
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
)

var clubAllTransactionsTable = table.New(table.Metadata{
	Name: "club_all_transactions",
	Columns: []string{
		"club_id",
		"bucket",

		"timestamp",

		"id",

		"amount",

		"currency",
	},
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

type MetricsCassandraRepository struct {
	session gocqlx.Session
}

func NewMetricsCassandraRepository(session gocqlx.Session) MetricsCassandraRepository {
	return MetricsCassandraRepository{session: session}
}
