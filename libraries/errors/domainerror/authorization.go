package domainerror

import (
	errors2 "github.com/pkg/errors"
	"overdoll/libraries/errors"
)

type (
	// Authorization represents validation error.
	Authorization struct {
		Message string
	}
)

// NewAuthorization returns new validation error.
func NewAuthorization(message string) error {

	var err error

	err = &Authorization{
		Message: message,
	}

	err = errors2.WithStack(err)
	err = errors.PopStack(err)
	err = errors.PopStack(err)

	return err
}

// Error returns string message.
func (e *Authorization) Error() string {
	return e.Message
}
