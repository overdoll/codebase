package apperror

import (
	"fmt"
	"overdoll/libraries/errors"
)

type NotFound struct {
	Message string
}

func NewNotFoundError(prefix, id string) error {
	return &NotFound{
		Message: fmt.Sprintf("%s '%s' not found", prefix, id),
	}
}

func (e *NotFound) Error() string {
	return e.Message
}

func IsNotFoundError(err error) bool {
	var t *NotFound
	return errors.As(err, &t)
}
