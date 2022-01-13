package account

type Filters struct {
	sortBy   Sorting
	username *string
}

func NewAccountFilters(sortBy string, username *string) (*Filters, error) {
	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &Filters{
		sortBy:   sorting,
		username: username,
	}, nil
}

func (e *Filters) Username() *string {
	return e.username
}

func (e *Filters) SortBy() Sorting {
	return e.sortBy
}
