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

func init() {
}

func NewNode(cursorValue interface{}) *Node {

	buf := new(bytes.Buffer)
	enc := gob.NewEncoder(buf)
	if err := enc.Encode(cursorValue); err != nil {
		panic(err)
	}

	return &Node{cursor: base64.StdEncoding.EncodeToString(buf.Bytes())}
}

func (n *Node) Cursor() string {
	return n.cursor
}

type Cursor struct {
	after  *gob.Decoder
	before *gob.Decoder
	first  *int
	last   *int
}

func NewCursor(after, before *string, first, last *int) (*Cursor, error) {

	var afterDst *gob.Decoder

	if after != nil && *after != "" {
		decoded, err := base64.StdEncoding.DecodeString(*after)
		if err != nil {
			return nil, err
		}

		dec := gob.NewDecoder(bytes.NewBuffer(decoded))

		afterDst = dec
	}

	var beforeDst *gob.Decoder

	if before != nil && *before != "" {
		decoded, err := base64.StdEncoding.DecodeString(*before)
		if err != nil {
			return nil, err
		}
		dec := gob.NewDecoder(bytes.NewBuffer(decoded))
		beforeDst = dec
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

	if afterDst != nil && beforeDst != nil {
		return nil, errors.New("passing both `after` and `before` to paginate a connection is not supported")
	}

	return &Cursor{
		after:  afterDst,
		before: beforeDst,
		first:  first,
		last:   last,
	}, nil
}

func (c *Cursor) After() *gob.Decoder {
	return c.after
}

func (c *Cursor) Before() *gob.Decoder {
	return c.before
}

func (c *Cursor) First() *int {
	return c.first
}

func (c *Cursor) Last() *int {
	return c.last
}

func (c *Cursor) Primary() *gob.Decoder {

	if c.after != nil {
		return c.after
	}

	if c.before != nil {
		return c.before
	}

	return nil
}

func (c *Cursor) IsEmpty() bool {
	return c.First() != nil && *c.First() == 0 || c.Last() != nil && *c.Last() == 0
}

func (c *Cursor) GetCursor() ([]interface{}, error) {

	if c.After() != nil {

		var afterValue []interface{}

		if err := c.After().Decode(&afterValue); err != nil {
			return nil, err
		}

		return afterValue, nil
	}

	if c.Before() != nil {

		var beforeValue []interface{}

		if err := c.Before().Decode(&beforeValue); err != nil {
			return nil, err
		}

		return beforeValue, nil
	}

	return nil, nil
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

func (c *Cursor) BuildElasticsearch(builder *elastic.SearchService, column, tieBreakerColumn string, ascending bool) error {

	// add search_after parameters
	if c.After() != nil {

		var afterValue []interface{}

		if err := c.After().Decode(&afterValue); err != nil {
			return err
		}

		builder.SearchAfter(afterValue...)
	}

	if c.Before() != nil {

		var beforeValue []interface{}

		if err := c.Before().Decode(&beforeValue); err != nil {
			return err
		}

		builder.SearchAfter(beforeValue...)
	}

	limit := c.GetLimit()

	if limit > 0 {
		builder.Size(limit)
	}

	isBackwardsPagination := c.Before() != nil || c.Last() != nil

	// if using "before" - we want to reverse the sort order to be able to grab the items correctly
	if isBackwardsPagination {
		builder.Sort(column, !ascending)

		// tie breaker
		builder.Sort(tieBreakerColumn, false)

	} else {
		builder.Sort(column, ascending)

		// tie breaker
		builder.Sort(tieBreakerColumn, true)
	}

	return nil
}

func (c *Cursor) BuildCassandra(builder *qb.SelectBuilder, column string, ascending bool) error {
	if c.After() != nil {
		if ascending {
			builder.Where(qb.Gt(column))
		} else {
			builder.Where(qb.Lt(column))
		}
	}

	if c.Before() != nil {
		if ascending {
			builder.Where(qb.Gt(column))
		} else {
			builder.Where(qb.Lt(column))
		}
	}

	limit := c.GetLimit()

	if limit > 0 {
		builder.Limit(uint(limit))
	}

	isBackwardsPagination := c.Before() != nil || c.Last() != nil

	// if using "before" - we want to reverse the sort order to be able to grab the items correctly
	if isBackwardsPagination {
		builder.OrderBy(column, qb.Order(!ascending))
	} else {
		builder.OrderBy(column, qb.Order(ascending))
	}

	return nil
}

// take redis keys, and based on cursor, sort results
func (c *Cursor) BuildRedis(k []string) ([]string, error) {

	sort.Strings(k)

	keys := k

	if c.After() != nil {

		indexAt := -1

		for i, v := range k {

			var afterValue string

			if err := c.After().Decode(&afterValue); err != nil {
				return nil, err
			}

			if v == afterValue {
				indexAt = i
			}
		}

		if indexAt == -1 {
			return []string{}, nil
		}

		keys = keys[indexAt:]
	}

	if c.Before() != nil {

		indexAt := -1

		for i, v := range k {

			var beforeValue string

			if err := c.Before().Decode(&beforeValue); err != nil {
				return nil, err
			}

			if v == beforeValue {
				indexAt = i
			}
		}

		if indexAt == -1 {
			return []string{}, nil
		}

		keys = keys[:indexAt]
	}

	return keys, nil
}
