package paging

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
