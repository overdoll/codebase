package post

import "github.com/go-playground/validator/v10"

func validateSlug(slug string) error {

	err := validator.New().Var(slug, "required,max=25,excludesall= ,alphanum")

	if err != nil {
		return err
	}

	return nil
}
