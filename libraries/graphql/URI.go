package graphql

import (
	"fmt"
	"io"
)

type URI string

// UnmarshalGQL implements the graphql.Unmarshaler interface
func (y *URI) UnmarshalGQL(v interface{}) error {
	yes, ok := v.(string)
	if !ok {
		return fmt.Errorf("YesNo must be a string")
	}

	*y = URI(yes)

	return nil
}

// MarshalGQL implements the graphql.Marshaler interface
func (y URI) MarshalGQL(w io.Writer) {
	w.Write([]byte(y))
}
