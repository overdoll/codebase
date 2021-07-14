package paging

type PageInfo struct {
	hasNextPage bool
	hasPrevPage bool
}

func (e *PageInfo) HasNextPage() bool {
	return e.hasNextPage
}

func (e *PageInfo) HasPrevPage() bool {
	return e.hasPrevPage
}

func NewPageInfo(hasNextPage, hasPreviousPage bool) *PageInfo {
	return &PageInfo{
		hasNextPage: hasNextPage,
		hasPrevPage: hasPreviousPage,
	}
}
