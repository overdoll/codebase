package club

type Filters struct {
	sortBy         Sorting
	slugs          []string
	search         *string
	ownerAccountId *string
	suspended      *bool
	terminated     *bool
	excludeEmpty   bool
	canSupport     *bool
}

func NewFilters(search *string, suspended *bool, sortBy string, slugs []string, ownerAccountId *string, terminated *bool, excludeEmpty bool, canSupport *bool) (*Filters, error) {

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
		suspended:      suspended,
		ownerAccountId: ownerAccountId,
		terminated:     terminated,
		excludeEmpty:   excludeEmpty,
		canSupport:     canSupport,
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

func (e *Filters) Suspended() *bool {
	return e.suspended
}

func (e *Filters) Terminated() *bool {
	return e.terminated
}

func (e *Filters) CanSupport() *bool {
	return e.canSupport
}

func (e *Filters) ExcludeEmpty() bool {
	return e.excludeEmpty
}
