package post

import (
	"errors"
)

var (
	ErrSeriesRequired = errors.New("a series slug is required when searching by character slugs")
)

type CharacterFilters struct {
	orderBy    string
	slugs      []string
	seriesSlug *string
	name       *string
}

func NewCharacterFilters(name *string, orderBy string, slugs []string, seriesSlug *string) (*CharacterFilters, error) {

	if len(slugs) > 0 && seriesSlug == nil {
		return nil, ErrSeriesRequired
	}

	return &CharacterFilters{
		orderBy:    orderBy,
		name:       name,
		slugs:      slugs,
		seriesSlug: seriesSlug,
	}, nil
}

func (e *CharacterFilters) Name() *string {
	return e.name
}

func (e *CharacterFilters) OrderBy() string {
	return e.orderBy
}

func (e *CharacterFilters) Slugs() []string {
	return e.slugs
}

func (e *CharacterFilters) SeriesSlug() *string {
	return e.seriesSlug
}
