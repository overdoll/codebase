package adapters

import (
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"time"
)

//
//Id                    string    `db:"id"`
//Status                string    `db:"status"`
//DepositDate           time.Time `db:"deposit_date"`
//ClubId                string    `db:"club_id"`
//Currency              string    `db:"currency"`
//Amount                int64     `db:"total_amount"`
//AccountPayoutMethodId string    `db:"account_payout_method_id"`
//DepositRequestId      string    `db:"deposit_request_id"`
//Timestamp             time.Time `db:"timestamp"`
//Events                []string  `db:"events"`
//TemporalWorkflowId    string    `db:"temporal_workflow_id"`

var clubPayoutsTable = table.New(table.Metadata{
	Name: "club_payouts",
	Columns: []string{
		"id",
		"status",
		"deposit_date",
		"club_id",
		"currency",
		"amount",
		"account_payout_method_id",
		"deposit_request_id",
		"timestamp",
		"events",
		"temporal_workflow_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubPayoutEvent struct {
	Id        string
	Timestamp time.Time
	Error     string
}

type clubPayout struct {
	Id                    string    `db:"id"`
	Status                string    `db:"status"`
	DepositDate           time.Time `db:"deposit_date"`
	ClubId                string    `db:"club_id"`
	Currency              string    `db:"currency"`
	Amount                int64     `db:"total_amount"`
	AccountPayoutMethodId string    `db:"account_payout_method_id"`
	DepositRequestId      string    `db:"deposit_request_id"`
	Timestamp             time.Time `db:"timestamp"`
	Events                []string  `db:"events"`
	TemporalWorkflowId    string    `db:"temporal_workflow_id"`
}

type PayoutCassandraRepository struct {
	session gocqlx.Session
}

func NewPayoutCassandraRepository(session gocqlx.Session) PayoutCassandraRepository {
	return PayoutCassandraRepository{session: session}
}
