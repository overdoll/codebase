package helpers

import (
	"reflect"
)

func GetStructName(a interface{}) string {
	return reflect.Indirect(reflect.ValueOf(a)).Type().Name()
}
