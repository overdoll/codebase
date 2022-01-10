package post

import (
	"strings"

	"overdoll/libraries/principal"
)

type Filters struct {
	sortBy        Sorting
	moderatorId   *string
	contributorId *string
	clubId        *string

	state          *string
	audienceSlugs  []string
	categorySlugs  []string
	characterSlugs []string
	seriesSlugs    []string
}

func NewPostFilters(sortBy string, state, moderatorId, contributorId, clubId *string, audienceSlugs, categorySlugs, characterSlugs, seriesSlugs []string) (*Filters, error) {

	var newState *string

	if state != nil {
		s := strings.ToLower(*state)
		newState = &s
	}

	sorting := UnknownSort
	var err error

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
		clubId:         clubId,
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

func (e *Filters) ClubId() *string {
	return e.clubId
}

func (e *Filters) State() *string {
	return e.state
}

func (e *Filters) OrderBy() Sorting {
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

// permission checks to gate what can actually be filtered
func CanViewWithFilters(requester *principal.Principal, filter *Filters) error {

	// any state that isnt published needs permission checks
	if (filter.state == nil) || (filter.state != nil && *filter.state != "published") {
		if filter.ContributorId() != nil {
			return requester.BelongsToAccount(*filter.ContributorId())
		}

		if filter.ModeratorId() != nil {
			return requester.BelongsToAccount(*filter.ModeratorId())
		}

		if !requester.IsStaff() {
			return principal.ErrNotAuthorized
		}
	}

	// filtering by moderator
	if filter.ModeratorId() != nil {

		if requester.IsStaff() {
			return nil
		}

		return requester.BelongsToAccount(*filter.ModeratorId())
	}

	return nil
}
