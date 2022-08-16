package games

import (
	"overdoll/libraries/errors/domainerror"
)

type State struct {
	slug string
}

var (
	UnknownState = State{""}
	Open         = State{"OPEN"}
	Closed       = State{"CLOSED"}
)

func (r State) String() string {
	return r.slug
}

func StateFromString(s string) (State, error) {
	switch s {
	case Open.slug:
		return Open, nil
	case Closed.slug:
		return Closed, nil
	}

	return UnknownState, domainerror.NewValidation("unknown session type: " + s)
}
