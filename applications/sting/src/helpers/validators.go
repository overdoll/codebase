package helpers

import (
	"fmt"
	"log"
	"strings"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/models"
	"overdoll/libraries/ksuid"
)

func CheckIfCharactersAreValid(s gocqlx.Session, chars []string) ([]ksuid.UUID, error) {
	// Ensure we set up correct characters (DB entries exist)
	queryCharacters := qb.Select("characters").
		Where(qb.InTuple("id", len(chars))).
		Query(s).
		BindStruct(&struct {
			id []string
		}{
			id: chars,
		})

	var characters []models.Character
	var characterIds []ksuid.UUID

	if err := queryCharacters.Get(&characters); err != nil {
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
	// Ensure we set up correct categories (DB entries exist)
	queryCategories := qb.Select("categories").
		Where(qb.InLit("id", strings.Join(cats, ","))).
		Query(s)

	log.Println(qb.Select("categories").
		Where(qb.InLit("id", strings.Join(cats, ","))).ToCql())

	var categories []models.Category
	var categoryIds []ksuid.UUID

	if err := queryCategories.Get(&categories); err != nil {
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
