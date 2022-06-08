package graphql

type ErrorResponse struct {
	Errors []struct {
		Message   string   `json:"message"`
		Path      []string `json:"path"`
		Locations []string `json:"locations"`
	} `json:"errors"`
}

var (
	InternalServerError = ErrorResponse{Errors: []struct {
		Message   string   `json:"message"`
		Path      []string `json:"path"`
		Locations []string `json:"locations"`
	}{
		{
			Message:   "internal server error",
			Path:      []string{},
			Locations: []string{},
		},
	}}
)

func NewErrorResponse(message string) ErrorResponse {
	return ErrorResponse{Errors: []struct {
		Message   string   `json:"message"`
		Path      []string `json:"path"`
		Locations []string `json:"locations"`
	}{
		{
			Message:   message,
			Path:      []string{},
			Locations: []string{},
		},
	}}
}
