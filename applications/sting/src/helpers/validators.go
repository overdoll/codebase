package helpers

import (
	"fmt"
	"strings"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/models"
	"overdoll/libraries/ksuid"
)

func CheckIfCharactersAreValid(s gocqlx.Session, chars []string) ([]ksuid.UUID, error) {
	// Ensure we set up correct characters (DB entries exist)

	final := []string{}

	for _, str := range chars {
		final = append(final, `'`+str+`'`)
	}

	var characterIds []ksuid.UUID

	// if none then we get out or else the query will fail
	if len(final) == 0 {
		return characterIds, nil
	}

	queryCharacters := qb.Select("characters").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(s)

	var characters []*models.Character

	if err := queryCharacters.Select(&characters); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if len(characters) != len(chars) {
		return nil, fmt.Errorf("invalid character chosen")
	}

	for _, cat := range characters {
		characterIds = append(characterIds, cat.Id)
	}

	return characterIds, nil
}

func CheckIfCategoriesAreValid(s gocqlx.Session, cats []string) ([]ksuid.UUID, error) {

	final := []string{}

	for _, str := range cats {
		final = append(final, `'`+str+`'`)
	}

	var categoryIds []ksuid.UUID

	if len(final) == 0 {
		return categoryIds, nil
	}

	// Ensure we set up correct categories (DB entries exist)
	queryCategories := qb.Select("categories").
		Where(qb.InLit("id", "("+strings.Join(final, ",")+")")).
		Query(s)

	var categories []models.Category

	if err := queryCategories.Select(&categories); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if len(categories) != len(cats) {
		return nil, fmt.Errorf("invalid category chosen")
	}

	for _, cat := range categories {
		categoryIds = append(categoryIds, cat.Id)
	}

	return categoryIds, nil
}
