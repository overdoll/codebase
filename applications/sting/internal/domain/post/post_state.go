package post

import "errors"

type State struct {
	slug string
}

var (
	Unknown   = State{""}
	Draft     = State{"draft"}
	Review    = State{"review"}
	Published = State{"published"}
	Discarded = State{"discarded"}
	Rejected  = State{"rejected"}
	Removed   = State{"removed"}
	Archived  = State{"archived"}
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
	}

	return Unknown, errors.New("unknown post state: " + s)
}
