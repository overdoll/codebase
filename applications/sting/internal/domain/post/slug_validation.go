package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"strings"
)

func validateSlug(slug string) error {

	err := validator.New().Var(slug, "required,max=25,excludesall= ,excludesall=.,hostname,lowercase")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	repeatCount := 1
	lastChar := ""

	for _, r := range slug {
		c := string(r)
		if c == lastChar {
			repeatCount++
			if repeatCount > 2 && c == "-" {
				return domainerror.NewValidation("slug cannot contain consecutive hyphens")
			}
		} else {
			repeatCount = 1
		}
		lastChar = c
	}

	if strings.HasSuffix(slug, "-") || strings.HasPrefix(slug, "-") {
		return domainerror.NewValidation("slug cannot end or start with hyphen")
	}

	return nil
}
