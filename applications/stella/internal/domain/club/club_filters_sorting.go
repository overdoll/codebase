package club

import (
	"errors"
)

type Sorting struct {
	slug string
}

var (
	UnknownSort = Sorting{""}
	PopularSort = Sorting{"POPULAR"}
)

func (r Sorting) String() string {
	return r.slug
}

func SortingFromString(s string) (Sorting, error) {

	switch s {
	case PopularSort.slug:
		return PopularSort, nil
	}

	return UnknownSort, errors.New("unknown sorting type: " + s)
}
