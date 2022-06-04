package domainerror

import (
	errors2 "github.com/pkg/errors"
	"overdoll/libraries/errors"
)

type (
	// Validation represents validation error.
	Validation struct {
		Message string
	}
)

// NewValidation returns new validation error.
func NewValidation(message string) error {

	var err error

	err = &Validation{
		Message: message,
	}

	err = errors2.WithStack(err)
	err = errors.PopStack(err)
	err = errors.PopStack(err)

	return err
}

// Error returns string message.
func (e *Validation) Error() string {
	return e.Message
}
