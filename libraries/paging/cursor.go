package paging

import (
	"bytes"
	"encoding/base64"
	"encoding/gob"
	"errors"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/qb"
	"sort"
)

type Node struct {
	cursor string
}

func NewNode(cursorValues ...interface{}) *Node {

	buf := new(bytes.Buffer)
	enc := gob.NewEncoder(buf)
	if err := enc.Encode(cursorValues); err != nil {
		panic(err)
	}

	return &Node{cursor: base64.StdEncoding.EncodeToString(buf.Bytes())}
}

func (n *Node) Cursor() string {
	return n.cursor
}

type Cursor struct {
	after  interface{}
	before interface{}
	first  *int
	last   *int
}

func NewCursor(after, before *string, first, last *int) (*Cursor, error) {

	var afterDst interface{}

	if after != nil && *after != "" {
		decoded, err := base64.StdEncoding.DecodeString(*after)
		if err != nil {
			return nil, err
		}

		dec := gob.NewDecoder(bytes.NewBuffer(decoded))
		if err := dec.Decode(afterDst); err != nil {
			return nil, err
		}
	}

	var beforeDst interface{}

	if before != nil && *before != "" {
		decoded, err := base64.StdEncoding.DecodeString(*before)
		if err != nil {
			return nil, err
		}

		dec := gob.NewDecoder(bytes.NewBuffer(decoded))
		if err := dec.Decode(beforeDst); err != nil {
			return nil, err
		}
	}

	if first != nil && *first < 0 {
		return nil, errors.New("`first` on a connection cannot be less than zero")
	}

	if last != nil && *last < 0 {
		return nil, errors.New("`last` on a connection cannot be less than zero")
	}

	if first != nil && last != nil {
		return nil, errors.New("passing both `first` and `last` to paginate a connection is not supported")

	}

	return &Cursor{
		after:  afterDst,
		before: beforeDst,
		first:  first,
		last:   last,
	}, nil
}

func (c *Cursor) After() interface{} {
	return c.after
}

func (c *Cursor) Before() interface{} {
	return c.before
}

func (c *Cursor) First() *int {
	return c.first
}

func (c *Cursor) Last() *int {
	return c.last
}

func (c *Cursor) IsEmpty() bool {
	return c.First() != nil && *c.First() == 0 || c.Last() != nil && *c.Last() == 0
}

func (c *Cursor) GetLimit() int {
	var limit int

	if c.First() != nil {
		limit = *c.First() + 1
	} else if c.Last() != nil {
		limit = *c.Last() + 1
	}

	return limit
}

func (c *Cursor) BuildElasticsearch(builder *elastic.SearchService, column string, ascending bool) {
	// add search_after parameters
	if c.After() != nil {
		builder.SearchAfter(c.After().([]interface{})...)
	}

	if c.Before() != nil {
		builder.SearchAfter(c.Before().([]interface{})...)
	}

	limit := c.GetLimit()

	if limit > 0 {
		builder.Size(limit)
	}

	isBackwardsPagination := c.After() == nil && c.Before() != nil

	// if using "before" - we want to reverse the sort order to be able to grab the items correctly
	if isBackwardsPagination {
		builder.Sort(column, !ascending)
	} else {
		builder.Sort(column, ascending)
	}
}

func (c *Cursor) BuildCassandra(builder *qb.SelectBuilder, column string) {
	if c.After() != nil {

		builder.Where(qb.LtLit(column, `'`+c.After().(string)+`'`))
	}

	if c.Before() != nil {
		builder.Where(qb.GtLit(column, `'`+c.Before().(string)+`'`))
	}

	limit := c.GetLimit()

	if limit > 0 {
		builder.Limit(uint(limit))
	}
}

// take redis keys, and based on cursor, sort results
func (c *Cursor) BuildRedis(k []string) []string {

	sort.Strings(k)

	keys := k

	if c.After() != nil {

		indexAt := -1

		for i, v := range k {
			if v == c.After().(string) {
				indexAt = i
			}
		}

		if indexAt == -1 {
			return []string{}
		}

		keys = keys[indexAt:]
	}

	if c.Before() != nil {

		indexAt := -1

		for i, v := range k {
			if v == c.Before().(string) {
				indexAt = i
			}
		}

		if indexAt == -1 {
			return []string{}
		}

		keys = keys[:indexAt]
	}

	return keys
}
