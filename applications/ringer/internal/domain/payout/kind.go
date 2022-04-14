package payout

import "errors"

type Kind struct {
	slug string
}

var (
	UnknownKind = Kind{""}
	OpenNode    = Kind{"OPENNODE"}
)

func (r Kind) String() string {
	return r.slug
}

func KindFromString(s string) (Kind, error) {
	switch s {
	case OpenNode.slug:
		return OpenNode, nil
	}

	return UnknownKind, errors.New("unknown kind: " + s)
}
