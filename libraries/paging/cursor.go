package paging

type Cursor struct {
	after  string
	before string
	first  int
	last   int
}

func NewCursor(before, after string, first, last int) *Cursor {

	if first == 0 {
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
