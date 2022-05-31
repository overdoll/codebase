package domainerror

type (
	// Authorization represents validation error.
	Authorization struct {
		Message string
	}
)

// NewAuthorization returns new validation error.
func NewAuthorization(message string) error {
	return &Authorization{
		Message: message,
	}
}

// Error returns string message.
func (e *Authorization) Error() string {
	return e.Message
}
