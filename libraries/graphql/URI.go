package graphql

import (
	"fmt"
	"io"
	"strconv"
)

type URI string

func NewURI(uri string) URI {
	return URI(uri)
}

func (y *URI) String() string {
	return string(*y)
}

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
	w.Write([]byte(strconv.Quote(string(y))))
}
