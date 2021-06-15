package paging

type Cursor struct {
	after  string
	before string
	first  int
	last   int
}

func NewCursor(before, after string, first, last int) *Cursor {
	return &Cursor{
		after:  after,
		before: before,
		first:  first,
		last:   last,
	}
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
