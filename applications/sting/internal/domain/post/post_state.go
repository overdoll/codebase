package post

import "errors"

type State struct {
	slug string
}

var (
	Unknown    = State{""}
	Draft      = State{"draft"}
	Publishing = State{"publishing"}
	Review     = State{"review"}
	Published  = State{"published"}
	Discarding = State{"discarding"}
	Discarded  = State{"discarded"}
	Rejected   = State{"rejected"}
	Processing = State{"processing"}
	Removed    = State{"removed"}
	Removing   = State{"removing"}
)

func (r State) String() string {
	return r.slug
}

func StateFromString(s string) (State, error) {
	switch s {
	case Draft.slug:
		return Draft, nil
	case Publishing.slug:
		return Publishing, nil
	case Review.slug:
		return Review, nil
	case Published.slug:
		return Published, nil
	case Discarding.slug:
		return Discarding, nil
	case Discarded.slug:
		return Discarded, nil
	case Rejected.slug:
		return Rejected, nil
	case Processing.slug:
		return Processing, nil
	case Removed.slug:
		return Removed, nil
	case Removing.slug:
		return Removing, nil
	}

	return Unknown, errors.New("unknown lock reason: " + s)
}
