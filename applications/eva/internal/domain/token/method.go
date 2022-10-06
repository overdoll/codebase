package token

import (
	"overdoll/libraries/errors/domainerror"
)

var (
	Unknown   = Method{""}
	MagicLink = Method{"MAGIC_LINK"}
	Code      = Method{"CODE"}
)

type Method struct {
	slug string
}

func (r Method) String() string {
	return r.slug
}

func MethodFromString(s string) (Method, error) {
	switch s {
	case Code.slug:
		return Code, nil
	case MagicLink.slug:
		return MagicLink, nil
	}

	return Unknown, domainerror.NewValidation("unknown method: " + s)
}
