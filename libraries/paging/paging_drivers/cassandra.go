package paging_drivers

import (
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/libraries/paging"
)

type CassandraPagerBuilder struct {
	Builder func(after *string, before *string) *qb.SelectBuilder
}

type CassandraPager struct {
	cursor  *paging.Cursor
	builder *CassandraPagerBuilder
}

func NewCassandraPager(cursor *paging.Cursor, builder *CassandraPagerBuilder) *CassandraPager {
	return &CassandraPager{cursor: cursor, builder: builder}
}

func (c *CassandraPager) getCountForBuilder(session gocqlx.Session, builder *qb.SelectBuilder, info interface{}) (int, error) {
	var count int

	if err := builder.
		CountAll().
		Query(session).
		Bind(info).
		Select(&count); err != nil {
		return count, err
	}

	return count, nil
}
