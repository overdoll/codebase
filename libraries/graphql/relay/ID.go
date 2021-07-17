package relay

import (
	"fmt"
	"io"
)

type ID string

func NewId(typename interface{}, args ...string) ID {
	return ID("")
}

// UnmarshalGQL implements the graphql.Unmarshaler interface
func (i *ID) UnmarshalGQL(v interface{}) error {
	id, ok := v.(string)
	if !ok {
		return fmt.Errorf("ID must be a string")
	}

	*i = ID(id)

	return nil
}

// MarshalGQL implements the graphql.Marshaler interface
func (i ID) MarshalGQL(w io.Writer) {
	w.Write([]byte(i))
}
