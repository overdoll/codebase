package post

type ObjectFilters struct {
	orderBy string
	slugs   []string
	search  *string
}

func NewObjectFilters(search *string, orderBy string, slugs []string) (*ObjectFilters, error) {
	return &ObjectFilters{
		orderBy: orderBy,
		search:  search,
		slugs:   slugs,
	}, nil
}

func (e *ObjectFilters) Search() *string {
	return e.search
}

func (e *ObjectFilters) OrderBy() string {
	return e.orderBy
}

func (e *ObjectFilters) Slugs() []string {
	return e.slugs
}
