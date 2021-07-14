package paging

type Cursor struct {
	after  string
	before string
	first  int
	last   int
}

type Pagination struct {
	forwards  func(first int, after string) (bool, error)
	backwards func(last int, before string) (bool, error)
	cursor    *Cursor
}

func NewPagination(cursor *Cursor) *Pagination {
	return &Pagination{cursor: cursor}
}

func (p *Pagination) DefineForwardsPagination(forwards func(first int, after string) (bool, error)) {
	p.forwards = forwards
}

func (p *Pagination) DefineBackwardsPagination(backwards func(last int, before string) (bool, error)) {
	p.backwards = backwards
}

func (p *Pagination) Run() (*PageInfo, error) {

	hasMoreAfter := false
	hasMoreBefore := false

	var err error

	if p.cursor.IsBeforeCursor() {
		hasMoreAfter, err = p.forwards(p.cursor.Last(), p.cursor.Before())

		if err != nil {
			return nil, err
		}

		hasMoreBefore, err = p.backwards(p.cursor.Last(), p.cursor.Before())

		if err != nil {
			return nil, err
		}
	} else if p.cursor.IsAfterCursor() {
		hasMoreBefore, err = p.backwards(p.cursor.First(), p.cursor.After())

		if err != nil {
			return nil, err
		}

		hasMoreAfter, err = p.forwards(p.cursor.First(), p.cursor.After())

		if err != nil {
			return nil, err
		}
	} else {
		hasMoreAfter, err = p.forwards(p.cursor.First(), p.cursor.After())

		if err != nil {
			return nil, err
		}
	}

	return NewPageInfo(hasMoreAfter, hasMoreBefore), nil
}

func NewCursor(before, after string, first, last int) *Cursor {

	if first < 0 {
		first = 10
	}

	return &Cursor{
		after:  after,
		before: before,
		first:  first,
		last:   last,
	}
}

func (c *Cursor) IsAfterCursor() bool {
	return c.after != ""
}

func (c *Cursor) IsBeforeCursor() bool {
	return c.before != "" && c.last != 0
}

func (c *Cursor) After() string {
	return c.after
}

func (c *Cursor) Before() string {
	return c.before
}

func (c *Cursor) First() int {
	return c.first
}

func (c *Cursor) Last() int {
	return c.last
}
