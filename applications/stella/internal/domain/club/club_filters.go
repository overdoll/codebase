package club

type Filters struct {
	sortBy         Sorting
	slugs          []string
	search         *string
	ownerAccountId *string
}

func NewFilters(search *string, sortBy string, slugs []string, ownerAccountId *string) (*Filters, error) {

	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &Filters{
		sortBy:         sorting,
		search:         search,
		slugs:          slugs,
		ownerAccountId: ownerAccountId,
	}, nil
}

func (e *Filters) Search() *string {
	return e.search
}

func (e *Filters) SortBy() Sorting {
	return e.sortBy
}

func (e *Filters) Slugs() []string {
	return e.slugs
}

func (e *Filters) OwnerAccountId() *string {
	return e.ownerAccountId
}
