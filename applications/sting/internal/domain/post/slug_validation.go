package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
	"regexp"
)

func validateSlug(slug string) error {

	err := validator.New().Var(slug, "required,max=25,excludesall= ,excludesall=.,hostname,lowercase")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	match, err := regexp.MatchString("(?!-)(?!.*--)[A-Za-z0-9-]+(?<!-)", slug)

	if err != nil {
		return err
	}

	if !match {
		return domainerror.NewValidation("slug cannot end or start with hyphen. slug cannot contain consecutive hyphens")
	}

	return nil
}
