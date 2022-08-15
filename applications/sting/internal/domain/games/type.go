package games

import (
	"overdoll/libraries/errors/domainerror"
)

type Type struct {
	slug string
}

var (
	Unknown  = Type{""}
	Roulette = Type{"ROULETTE"}
)

func (r Type) String() string {
	return r.slug
}

func TypeFromString(s string) (Type, error) {
	switch s {
	case Roulette.slug:
		return Roulette, nil
	}

	return Unknown, domainerror.NewValidation("unknown game type: " + s)
}
