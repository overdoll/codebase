package paging_drivers

import (
	"github.com/scylladb/gocqlx/v2"
	"overdoll/libraries/paging"
)

type PageState struct {
	hasMore bool
	token   string
}

func (p PageState) Token() string {
	return p.token
}

func (p PageState) HasMore() bool {
	return p.hasMore
}

// Page will take in gocqlx QB and return the page state
func PageCassandra(cursor *paging.Cursor, query *gocqlx.Queryx, q func(iter *gocqlx.Iterx) error) (PageState, error) {

	var state []byte

	query.PageState(state)
	query.PageSize(10)

	defer query.Release()

	iter := query.Iter()

	err := q(iter)

	return PageState{
		hasMore: len(iter.PageState()) != 0,
		token:   string(iter.PageState()),
	}, err
}
