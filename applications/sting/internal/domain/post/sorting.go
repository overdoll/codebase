package post

import (
	"errors"
)

type Sorting struct {
	slug string
}

var (
	UnknownSort = Sorting{""}
	NewSort     = Sorting{"NEW"}
	TopSort     = Sorting{"TOP"}
	PopularSort = Sorting{"POPULAR"}
)

func (r Sorting) String() string {
	return r.slug
}

func SortingFromString(s string) (Sorting, error) {

	switch s {
	case NewSort.slug:
		return NewSort, nil
	case TopSort.slug:
		return TopSort, nil
	case PopularSort.slug:
		return PopularSort, nil
	}

	return UnknownSort, errors.New("unknown sorting type: " + s)
}
