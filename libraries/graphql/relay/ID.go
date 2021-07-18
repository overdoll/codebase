package relay

import (
	"encoding/base64"
	"fmt"
	"io"
	"reflect"
	"strings"
)

type ID string

func NewID(typename interface{}, args ...string) ID {

	typeName := ""

	switch typename.(type) {
	case string:
		typeName = typename.(string)
	case struct{}:
		typeName = reflect.TypeOf(typename).Name()
	default:

	}

	return ID(strings.Join(append([]string{typeName}, args...), ":"))
}

func decode(i ID) []string {

	sDec, err := base64.StdEncoding.DecodeString(string(i))
	if err != nil {
		return []string{string(i)}
	}

	splits := strings.Split(string(sDec), ":")

	return splits
}

func (i ID) GetID() string {
	splits := decode(i)
	return splits[len(splits)-1]
}

func (i ID) GetTypeName() string {
	return decode(i)[0]
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
