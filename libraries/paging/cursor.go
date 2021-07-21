package paging

import (
	"encoding/base64"
	"errors"
)

type Node struct {
	cursor string
}

func NewNode(cursor string) *Node {
	return &Node{cursor: base64.StdEncoding.EncodeToString([]byte(cursor))}
}

func (n *Node) Cursor() string {
	return n.cursor
}

type Cursor struct {
	after  *string
	before *string
	first  *int
	last   *int
}

func NewCursor(after, before *string, first, last *int) (*Cursor, error) {

	if after != nil && *after != "" {
		decoded, err := base64.StdEncoding.DecodeString(*after)
		if err != nil {
			return nil, err
		}

		dec := string(decoded)
		after = &dec
	}

	if before != nil && *before != "" {
		decoded, err := base64.StdEncoding.DecodeString(*before)
		if err != nil {
			return nil, err
		}

		dec := string(decoded)
		before = &dec
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
		after:  after,
		before: before,
		first:  first,
		last:   last,
	}, nil
}

func (c *Cursor) After() *string {
	return c.after
}

func (c *Cursor) Before() *string {
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
