package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type DetailsCassandraRepository struct {
	session gocqlx.Session
}

func NewDetailsCassandraRepository(session gocqlx.Session) DetailsCassandraRepository {
	return DetailsCassandraRepository{session: session}
}
