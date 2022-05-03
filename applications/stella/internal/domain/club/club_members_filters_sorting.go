package club

import (
	"errors"
)

type MemberSorting struct {
	slug string
}

var (
	UnknownMemberSort = MemberSorting{""}
	MemberNewSort     = MemberSorting{"NEWEST"}
)

func (r MemberSorting) String() string {
	return r.slug
}

func MemberSortingFromString(s string) (MemberSorting, error) {

	switch s {
	case MemberNewSort.slug:
		return MemberNewSort, nil
	}

	return UnknownMemberSort, errors.New("unknown member sorting type: " + s)
}
