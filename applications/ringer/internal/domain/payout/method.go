package payout

import "errors"

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

	return UnknownKind, errors.New("unknown method: " + s)
}
