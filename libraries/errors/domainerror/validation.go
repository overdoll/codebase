package domainerror

type (
	// Validation represents validation error.
	Validation struct {
		Message string
	}
)

// NewValidation returns new validation error.
func NewValidation(message string) error {
	return &Validation{
		Message: message,
	}

}

// Error returns string message.
func (e *Validation) Error() string {
	return e.Message
}
