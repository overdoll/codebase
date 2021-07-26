package mailing

import (
	"os"

	"github.com/matcornic/hermes/v2"
)

var template = hermes.Hermes{
	// Optional Theme
	// Theme: new(Default)
	Product: hermes.Product{
		// Appears in header & footer of e-mails
		Name: "overdoll",
		Link: os.Getenv("APP_URL"),
		// Optional product logo
		Logo: os.Getenv("APP_LOGO"),
	},
}
