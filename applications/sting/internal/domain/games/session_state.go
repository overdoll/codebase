package games

import (
	"overdoll/libraries/errors/domainerror"
)

type SessionState struct {
	slug string
}

var (
	UnknownSessionState = SessionState{""}
	Open                = SessionState{"OPEN"}
	Closed              = SessionState{"CLOSED"}
)

func (r SessionState) String() string {
	return r.slug
}

func SessionStateFromString(s string) (SessionState, error) {
	switch s {
	case Open.slug:
		return Open, nil
	case Closed.slug:
		return Open, nil
	}

	return UnknownSessionState, domainerror.NewValidation("unknown session type: " + s)
}
