package paging

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

func (p *Pagination) Run() (*Info, error) {

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

	return NewPaging(hasMoreAfter, hasMoreBefore), nil
}

type Info struct {
	hasNextPage bool
	hasPrevPage bool
}

func (e *Info) HasNextPage() bool {
	return e.hasNextPage
}

func (e *Info) HasPrevPage() bool {
	return e.hasPrevPage
}

func NewPaging(hasNextPage, hasPreviousPage bool) *Info {
	return &Info{
		hasNextPage: hasNextPage,
		hasPrevPage: hasPreviousPage,
	}
}
