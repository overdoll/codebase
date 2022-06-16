package apperror

import (
	"fmt"
)

type Recoverable struct {
	Message string
}

func NewRecoverableError(message string) error {
	return &Recoverable{
		Message: fmt.Sprintf("recoverable error: %s", message),
	}
}

func (e *Recoverable) Error() string {
	return e.Message
}
