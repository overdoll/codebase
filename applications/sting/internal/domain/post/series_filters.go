package post

type SeriesFilters struct {
	sortBy       Sorting
	slugs        []string
	search       *string
	excludeEmpty bool
}

func NewSeriesFilters(search *string, sortBy string, slugs []string, excludeEmpty bool) (*SeriesFilters, error) {

	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &SeriesFilters{
		sortBy:       sorting,
		search:       search,
		slugs:        slugs,
		excludeEmpty: excludeEmpty,
	}, nil
}

func (e *SeriesFilters) Search() *string {
	return e.search
}

func (e *SeriesFilters) SortBy() Sorting {
	return e.sortBy
}

func (e *SeriesFilters) Slugs() []string {
	return e.slugs
}

func (e *SeriesFilters) ExcludeEmpty() bool {
	return e.excludeEmpty
}
