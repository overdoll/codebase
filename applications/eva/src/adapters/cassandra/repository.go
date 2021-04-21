package cassandra

import (
	"github.com/scylladb/gocqlx/v2"
)

type Repository struct {
	session gocqlx.Session
}

func NewRepository(session gocqlx.Session) Repository {
	return Repository{session: session}
}
