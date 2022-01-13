package account

import (
	"errors"
)

type Sorting struct {
	slug string
}

var (
	UnknownSort = Sorting{""}
	NewSort     = Sorting{"new"}
	PopularSort = Sorting{"popular"}
)

func (r Sorting) String() string {
	return r.slug
}

func SortingFromString(s string) (Sorting, error) {

	switch s {
	case NewSort.slug:
		return NewSort, nil
	case PopularSort.slug:
		return PopularSort, nil
	}

	return UnknownSort, errors.New("unknown sorting type: " + s)
}
