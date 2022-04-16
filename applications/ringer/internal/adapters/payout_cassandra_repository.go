package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type PayoutCassandraRepository struct {
	session gocqlx.Session
}

func NewPayoutCassandraRepository(session gocqlx.Session) PayoutCassandraRepository {
	return PayoutCassandraRepository{session: session}
}
