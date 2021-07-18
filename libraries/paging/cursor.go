package paging

type Node struct {
	cursor string
}

func NewNode(cursor string) *Node {
	return &Node{cursor: cursor}
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
