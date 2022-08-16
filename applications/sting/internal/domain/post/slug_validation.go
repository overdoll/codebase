package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/errors/domainerror"
)

func validateSlug(slug string) error {

	err := validator.New().Var(slug, "required,max=25,excludesall= ,excludesall=.,lowercase,hostname")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
