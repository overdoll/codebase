package club

import (
	"overdoll/libraries/domainerror"
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

	return UnknownSort, domainerror.NewValidation("unknown sorting type: " + s)
}
