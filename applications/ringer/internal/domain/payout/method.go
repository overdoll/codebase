package payout

import (
	"overdoll/libraries/domainerror"
)

type Method struct {
	slug string
}

var (
	UnknownKind = Method{""}
	Paxum       = Method{"PAXUM"}
)

func (r Method) String() string {
	return r.slug
}

func MethodFromString(s string) (Method, error) {
	switch s {
	case Paxum.slug:
		return Paxum, nil
	}

	return UnknownKind, domainerror.NewValidation("unknown method: " + s)
}
