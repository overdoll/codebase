package support

import (
	"overdoll/libraries/errors/gocql"
)

func ParseGoCQLError(err error) error {
	return gocql.NewError(err)
}
