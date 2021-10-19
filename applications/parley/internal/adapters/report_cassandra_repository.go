package adapters

import (
	"github.com/scylladb/gocqlx/v2"
)

type ReportCassandraRepository struct {
	session gocqlx.Session
}

func NewReportCassandraRepository(session gocqlx.Session) ReportCassandraRepository {
	return ReportCassandraRepository{session: session}
}
