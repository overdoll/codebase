package resource

import (
	"overdoll/libraries/errors/domainerror"
	"strconv"
)

var (
	Unknown = Type{0}
	Image   = Type{1}
	Video   = Type{2}
)

type Type struct {
	slug int
}

func (r Type) Int() int {
	return r.slug
}

func TypeFromInt(i int) (Type, error) {
	switch i {
	case Image.slug:
		return Image, nil
	case Video.slug:
		return Video, nil
	}

	return Unknown, domainerror.NewValidation("unknown type: " + strconv.Itoa(i))
}
