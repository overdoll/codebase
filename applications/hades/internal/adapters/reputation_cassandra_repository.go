package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type ReputationCassandraRepository struct {
	session gocqlx.Session
}

func NewReputationCassandraRepository(session gocqlx.Session) ReputationCassandraRepository {
	return ReputationCassandraRepository{session: session}
}
