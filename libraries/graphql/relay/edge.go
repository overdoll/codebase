package relay

type Paging struct {
	hasNextPage bool
	hasPrevPage bool
}

func (e *Paging) HasNextPage() bool {
	return e.hasNextPage
}

func (e *Paging) HasPrevPage() bool {
	return e.hasPrevPage
}

func NewPageInfo(hasNextPage, hasPreviousPage bool) *Paging {
	return &Paging{
		hasNextPage: hasNextPage,
		hasPrevPage: hasPreviousPage,
	}
}
