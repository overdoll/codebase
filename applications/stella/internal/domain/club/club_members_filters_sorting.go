package club

import (
	"overdoll/libraries/errors/domainerror"
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

	return UnknownMemberSort, domainerror.NewValidation("unknown member sorting type: " + s)
}
