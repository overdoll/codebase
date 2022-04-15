package payout

import "errors"

type Method struct {
	slug string
}

var (
	UnknownKind = Method{""}
	OpenNode    = Method{"OPENNODE"}
)

func (r Method) String() string {
	return r.slug
}

func MethodFromString(s string) (Method, error) {
	switch s {
	case OpenNode.slug:
		return OpenNode, nil
	}

	return UnknownKind, errors.New("unknown method: " + s)
}
