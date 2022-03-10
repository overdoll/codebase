package graphql

import (
	"fmt"
	"io"
	"strconv"
)

type Long int64

// UnmarshalGQL implements the graphql.Unmarshaler interface
func (y *Long) UnmarshalGQL(v interface{}) error {
	yes, ok := v.(string)
	if !ok {
		return fmt.Errorf("YesNo must be a string")
	}

	i, err := strconv.ParseInt(yes, 10, 64)
	if err != nil {
		return err
	}

	*y = Long(i)

	return nil
}

// MarshalGQL implements the graphql.Marshaler interface
func (y Long) MarshalGQL(w io.Writer) {
	w.Write([]byte(strconv.Quote(strconv.FormatInt(int64(y), 10))))
}
