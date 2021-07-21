package relay

import (
	"encoding/base64"
	"fmt"
	"io"
	"reflect"
	"strconv"
	"strings"
)

type ID string

func NewID(typename interface{}, args ...string) ID {

	typeName := ""

	if reflect.ValueOf(typename).Kind() == reflect.Struct {
		typeName = reflect.TypeOf(typename).Name()
	} else {
		switch typename.(type) {
		case string:
			typeName = typename.(string)
		}

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

// GetCompositePartID will get the composite IDs that make up the ID
// GetID usually grabs the most-right ID (which is usually the primary key) but you can add any IDs in the middle to make it
// a composite ID.
// This function will grab the ID starting from the left, starting from 0

// for example: StructName:SomeID1:SomeID2
// GetCompositePartID(0) will get "SomeID2"
// GetCompositePartID(1) will get "SomeID1"
func (i ID) GetCompositePartID(pos int) string {
	splits := decode(i)

	if len(splits) < len(splits)-pos {
		return ""
	}

	return splits[len(splits)-1-(-1*pos)]
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
	w.Write([]byte(strconv.Quote(base64.StdEncoding.EncodeToString([]byte(i)))))
}
