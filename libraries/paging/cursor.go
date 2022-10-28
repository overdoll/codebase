package paging

import (
	"bytes"
	"encoding/base64"
	"encoding/gob"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"sort"
)

var (
	ErrCursorNotPresent = domainerror.NewValidation("cursor not present")
)

func init() {
	gob.Register(gocql.UUID{})
}

type Node struct {
	cursor string
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
	after          *gob.Decoder
	afterOriginal  *string
	before         *gob.Decoder
	beforeOriginal *string
	first          *int
	last           *int
}

func NewCursor(after, before *string, first, last *int) (*Cursor, error) {

	var afterDst *gob.Decoder

	if after != nil && *after != "" {

		dec, err := decodeBuffer(after)

		if err != nil {
			return nil, err
		}

		afterDst = dec
	}

	var beforeDst *gob.Decoder

	if before != nil && *before != "" {
		dec, err := decodeBuffer(before)

		if err != nil {
			return nil, err
		}

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
		after:          afterDst,
		afterOriginal:  after,
		before:         beforeDst,
		beforeOriginal: before,
		first:          first,
		last:           last,
	}, nil
}

func (c *Cursor) After() *gob.Decoder {
	return c.after
}

func decodeBuffer(input *string) (*gob.Decoder, error) {
	decoded, err := base64.StdEncoding.DecodeString(*input)
	if err != nil {
		return nil, errors.Wrap(err, "failed to decode buffer")
	}
	return gob.NewDecoder(bytes.NewBuffer(decoded)), nil
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
			return nil, errors.Wrap(err, "failed to decode cursor")
		}

		return afterValue, nil
	}

	if c.Before() != nil {

		var beforeValue []interface{}

		if err := c.Before().Decode(&beforeValue); err != nil {
			return nil, errors.Wrap(err, "failed to decode cursor")
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

func (c *Cursor) BuildElasticsearchAggregate(aggregationBuckets []string, append func(index int, bucket string)) error {

	var curseAll []interface{}
	var curse string

	if c.After() != nil {
		if err := c.After().Decode(&curseAll); err != nil {
			return err
		}

		// exit out
		if len(curseAll) > 1 {
			return nil
		}

		// if the first type isn't a string
		switch curseAll[0].(type) {
		case string:
			curse = curseAll[0].(string)
			break
		default:
			return nil
		}
	}

	var foundCursor bool

	size := c.GetLimit()

	if size == 0 {
		size = 10
	}

	for i := 0; i < size; i++ {
		if i == len(aggregationBuckets)-1 || len(aggregationBuckets) == 0 {
			break
		}

		targetKey := aggregationBuckets[i]

		// make sure we reach our cursor
		if curse != "" {
			if targetKey == curse {
				foundCursor = true
			}
			if !foundCursor {
				continue
			}
		}

		append(i, aggregationBuckets[i])
	}

	return nil
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

	var createdCursorString string
	var createdCursorTimeUUID gocql.UUID

	hasCursor := false

	if c.After() != nil {
		err := c.After().Decode(&createdCursorString)

		if err != nil {

			// decode buffer again since there was an error
			buff, err := decodeBuffer(c.afterOriginal)

			if err != nil {
				return err
			}

			err = buff.Decode(&createdCursorTimeUUID)
			if err != nil {
				return errors.Wrap(err, "failed to decode cursor")
			}
		}

		hasCursor = true
	}

	if c.Before() != nil {
		err := c.Before().Decode(&createdCursorString)

		if err != nil {

			// decode buffer again since there was an error
			buff, err := decodeBuffer(c.beforeOriginal)

			if err != nil {
				return err
			}

			err = buff.Decode(&createdCursorTimeUUID)
			if err != nil {
				return errors.Wrap(err, "failed to decode cursor")
			}
		}

		hasCursor = true
	}

	if !hasCursor {
		return nil
	}

	var value string

	if createdCursorString != "" {
		value = `'` + createdCursorString + `'`
	} else {
		value = createdCursorTimeUUID.String()
	}

	if c.After() != nil {
		if ascending {
			builder.Where(qb.GtLit(column, value))
		} else {
			builder.Where(qb.LtLit(column, value))
		}
	}

	if c.Before() != nil {
		if ascending {
			builder.Where(qb.GtLit(column, value))
		} else {
			builder.Where(qb.LtLit(column, value))
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

func (c *Cursor) BuildRedis(k []string) ([]string, error) {

	sort.Strings(k)

	keys := k

	if c.After() != nil {

		indexAt := -1

		for i, v := range k {

			var afterValue string

			if err := c.After().Decode(&afterValue); err != nil {
				return nil, errors.Wrap(err, "failed to decode cursor")
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
				return nil, errors.Wrap(err, "failed to decode cursor")
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
