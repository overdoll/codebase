package post

type ObjectFilters struct {
	sortBy Sorting
	slugs  []string
	search *string
}

func NewObjectFilters(search *string, sortBy string, slugs []string) (*ObjectFilters, error) {

	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &ObjectFilters{
		sortBy: sorting,
		search: search,
		slugs:  slugs,
	}, nil
}

func (e *ObjectFilters) Search() *string {
	return e.search
}

func (e *ObjectFilters) SortBy() Sorting {
	return e.sortBy
}

func (e *ObjectFilters) Slugs() []string {
	return e.slugs
}
