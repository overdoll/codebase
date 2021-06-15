package paging

type PageInfo struct {
	hasNextPage bool
}

func NewPageInfo(hasNextPage bool) *PageInfo {
	return &PageInfo{
		hasNextPage: hasNextPage,
	}
}
