package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type InfractionCassandraRepository struct {
	session gocqlx.Session
}

func NewInfractionCassandraRepository(session gocqlx.Session) InfractionCassandraRepository {
	return InfractionCassandraRepository{session: session}
}
