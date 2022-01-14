package post

import (
	"strings"

	"overdoll/libraries/principal"
)

type Filters struct {
	sortBy        Sorting
	moderatorId   *string
	contributorId *string
	clubIds       []string

	state          State
	audienceSlugs  []string
	categorySlugs  []string
	characterSlugs []string
	seriesSlugs    []string

	audienceIds []string
	categoryIds []string
}

func NewPostFilters(sortBy string, state, moderatorId, contributorId *string, clubIds, audienceSlugs, categorySlugs, characterSlugs, seriesSlugs []string) (*Filters, error) {

	newState := Unknown
	var err error

	if state != nil {
		s := strings.ToLower(*state)

		newState, err = StateFromString(s)

		if err != nil {
			return nil, err
		}
	}

	sorting := UnknownSort

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &Filters{
		sortBy:         sorting,
		state:          newState,
		moderatorId:    moderatorId,
		contributorId:  contributorId,
		clubIds:        clubIds,
		audienceSlugs:  audienceSlugs,
		categorySlugs:  categorySlugs,
		characterSlugs: characterSlugs,
		seriesSlugs:    seriesSlugs,
	}, nil
}

func (e *Filters) ModeratorId() *string {
	return e.moderatorId
}

func (e *Filters) ContributorId() *string {
	return e.contributorId
}

func (e *Filters) ClubIds() []string {
	return e.clubIds
}

func (e *Filters) State() State {
	return e.state
}

func (e *Filters) SortBy() Sorting {
	return e.sortBy
}

func (e *Filters) AudienceSlugs() []string {
	return e.audienceSlugs
}

func (e *Filters) SeriesSlugs() []string {
	return e.seriesSlugs
}

func (e *Filters) CategorySlugs() []string {
	return e.categorySlugs
}

func (e *Filters) CharacterSlugs() []string {
	return e.characterSlugs
}

func (e *Filters) CategoryIds() []string {
	return e.categoryIds
}

func (e *Filters) AudienceIds() []string {
	return e.audienceIds
}

// permission checks to gate what can actually be filtered
func CanViewWithFilters(requester *principal.Principal, filter *Filters) error {
	return nil
}
