package relay

import (
	"overdoll/libraries/paging"
)

type ConnectionInput struct {
	After  *string `json:"after"`
	Before *string `json:"before"`
	First  *int    `json:"first"`
	Last   *int    `json:"last"`
}

type PageInfo struct {
	HasNextPage     bool    `json:"hasNextPage"`
	HasPreviousPage bool    `json:"hasPreviousPage"`
	StartCursor     *string `json:"startCursor"`
	EndCursor       *string `json:"endCursor"`
}

func (c ConnectionInput) ToCursor() *paging.Cursor {
	// todo: placeholder values for empty cursors

	before := ""

	if c.Before != nil {
		before = *c.Before
	}

	after := ""

	if c.After != nil {
		after = *c.After
	}

	first := 10

	if c.First != nil {
		first = *c.First
	}

	last := 0

	if c.Last != nil {
		last = *c.Last
	}

	return paging.NewCursor(before, after, first, last)
}
