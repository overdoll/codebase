package apperror

import (
	"fmt"
	errors2 "github.com/pkg/errors"
	"overdoll/libraries/errors"
)

type NotFound struct {
	Message string
}

func NewNotFoundError(prefix, id string) error {

	var err error

	err = &NotFound{
		Message: fmt.Sprintf("%s '%s' not found", prefix, id),
	}

	err = errors2.WithStack(err)
	err = errors.PopStack(err)
	err = errors.PopStack(err)

	return err
}

func (e *NotFound) Error() string {
	return e.Message
}

func IsNotFoundError(err error) bool {
	var t *NotFound
	return errors.As(err, &t)
}
