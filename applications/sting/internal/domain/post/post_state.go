package post

import (
	"overdoll/libraries/errors/domainerror"
)

type State struct {
	slug string
}

var (
	Unknown    = State{""}
	Draft      = State{"DRAFT"}
	Review     = State{"REVIEW"}
	Published  = State{"PUBLISHED"}
	Discarded  = State{"DISCARDED"}
	Rejected   = State{"REJECTED"}
	Removed    = State{"REMOVED"}
	Archived   = State{"ARCHIVED"}
	Submitting = State{"SUBMITTING"}
)

func (r State) String() string {
	return r.slug
}

func StateFromString(s string) (State, error) {
	switch s {
	case Draft.slug:
		return Draft, nil
	case Review.slug:
		return Review, nil
	case Published.slug:
		return Published, nil
	case Discarded.slug:
		return Discarded, nil
	case Rejected.slug:
		return Rejected, nil
	case Removed.slug:
		return Removed, nil
	case Archived.slug:
		return Archived, nil
	case Submitting.slug:
		return Submitting, nil
	}

	return Unknown, domainerror.NewValidation("unknown post state: " + s)
}
