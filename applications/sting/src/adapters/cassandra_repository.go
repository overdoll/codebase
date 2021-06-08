package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type CassandraRepository struct {
	session gocqlx.Session
}

func NewCassandraRepository(session gocqlx.Session) CassandraRepository {
	return CassandraRepository{session: session}
}
