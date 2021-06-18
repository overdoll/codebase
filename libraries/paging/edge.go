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

func NewPageInfo(hasMore bool) *PageInfo {
	return &PageInfo{
		hasNextPage: hasMore,
		hasPrevPage: hasMore,
	}
}
