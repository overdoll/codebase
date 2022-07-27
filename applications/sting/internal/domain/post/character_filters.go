package post

import (
	"overdoll/libraries/errors/domainerror"
)

var (
	ErrSeriesRequired = domainerror.NewValidation("a series slug is required when searching by character slugs")
)

type CharacterFilters struct {
	sortBy         Sorting
	slugs          []string
	seriesSlug     *string
	name           *string
	clubId         *string
	clubCharacters *bool
	seriesId       *string
}

func NewCharacterFilters(name *string, sortBy string, slugs []string, seriesSlug, clubId *string, clubCharacters *bool, seriesId *string) (*CharacterFilters, error) {

	if len(slugs) > 0 && seriesSlug == nil {
		return nil, ErrSeriesRequired
	}

	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &CharacterFilters{
		sortBy:         sorting,
		name:           name,
		slugs:          slugs,
		seriesSlug:     seriesSlug,
		clubId:         clubId,
		clubCharacters: clubCharacters,
		seriesId:       seriesId,
	}, nil
}

func (e *CharacterFilters) Name() *string {
	return e.name
}

func (e *CharacterFilters) SortBy() Sorting {
	return e.sortBy
}

func (e *CharacterFilters) Slugs() []string {
	return e.slugs
}

func (e *CharacterFilters) SeriesSlug() *string {
	return e.seriesSlug
}

func (e *CharacterFilters) ClubId() *string {
	return e.clubId
}

func (e *CharacterFilters) SeriesId() *string {
	return e.seriesId
}

func (e *CharacterFilters) ClubCharacters() *bool {
	return e.clubCharacters
}
