package support

import (
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/gocql"
)

func NewGocqlError(err error) error {
	return gocql.NewError(err)
}

func NewGocqlTransactionError() error {
	return gocql.NewError(errors.New("lightweight transaction failed"))
}
