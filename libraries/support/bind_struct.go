package support

import (
	"github.com/scylladb/go-reflectx"
	"github.com/scylladb/gocqlx/v2"
	"reflect"
)

func BindStructFromArgs(names []string, arg0 interface{}) []interface{} {

	mapper := gocqlx.DefaultMapper
	arglist := make([]interface{}, 0, len(names))

	// grab the indirected value of arg
	v := reflect.ValueOf(arg0)
	for v = reflect.ValueOf(arg0); v.Kind() == reflect.Ptr; {
		v = v.Elem()
	}

	_ = mapper.TraversalsByNameFunc(v.Type(), names, func(i int, t []int) error {
		if len(t) != 0 {
			val := reflectx.FieldByIndexesReadOnly(v, t) // nolint:scopelint
			arglist = append(arglist, val.Interface())
		}

		return nil
	})

	return arglist
}
