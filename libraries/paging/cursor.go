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
		return nil, errors.New("argument first cannot be less than 0")
	}

	if last != nil && *last < 0 {
		return nil, errors.New("argument last cannot be less than 0")
	}

	return &Cursor{
		after:  after,
		before: before,
		first:  first,
		last:   last,
	}, nil
}

func (c *Cursor) IsAfterCursor() bool {
	return c.after != nil
}

func (c *Cursor) IsBeforeCursor() bool {
	return c.before != nil && c.last != nil
}

func (c *Cursor) After() string {
	return *c.after
}

func (c *Cursor) Before() string {
	return *c.before
}

func (c *Cursor) First() int {
	return *c.first
}

func (c *Cursor) Last() int {
	return *c.last
}
